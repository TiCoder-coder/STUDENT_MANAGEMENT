// Có thể không sử dụng file này
import type { Request, Response, NextFunction } from "express";
import { checkAccessToken, checkRefreshToken, KiemTraTokenThuHoi } from "./XuLyToken";

// Class chứa hàm dùng để kiểm tra token của user khi đăng nhập
export async function requireJWT(req: Request, res: Response, next: NextFunction) {
    try {

        const auth = req.headers.authorization;             // Lấy header của token  (Bearer)

        // Kiểm tra token có đúng header hay không
        if (!auth) {
            return res.status(401).json({
                message: "Thiếu header cho token (Bearer <access_toke>)",
            })
        }

        const parts = auth.trim().split(/\s+/);             // Tách token ra (lấy từ cuối tgoiws khoảng trắng đàu tiên)
        
        // Kiểm tra token có đúng 2 thành phần hay không và thành phần đầu tiên có phải là bearer hay không
        if (parts.length < 2 || parts[0].toLocaleLowerCase() !== "bearer") {
            return res.status(401).json({message: "Sai định dạng token. Đúng Bearer <token>"});
        }

        // Kiểm tra token
        const token = parts[parts.length - 1]               // Lấy token
        if (!token) {
            return res.status(401).json({message: "Không có token để kiểm tra."})
        }

        // Kiểm tra token có bị thu hồi hay không
        if (await KiemTraTokenThuHoi(token)){
            return res.status(401).json({message: "Token đã bị thu hồi."});
        }
        const payload = checkAccessToken(token);
        
        if (!payload?.userId || !payload?.role) {
            return res.status(401).json({message: "Lỗi token. Thiếu userId/role"});
        }

        // Nếu ok hét thì gán thông tin vào user để in ra
        // Gắn user vào request để controller và service dùng
        (req as any).user = {
            userId: payload.userId,
            role: payload.role,
        }

        return next();
    } catch (error: any) {
        return res.status(401).json({
            message: "Token không hợp lệ/ hết hạn",
            detail: error?.message,
        })
    }

}

// Hàm này sẽ dùng trong @Security để định nghĩa cho bearerAuth
// Hàm này support trong tsoa.json lúc gen ra để nó không lỗi -- chức năng cũng tư\ong tự như requireJWT ở trên
export async function expressAuthentication(request: Request, securityName: string, scopes?: string[]) {
    if (securityName !== "bearerAuth") { throw new Error ("Không đúng security schema.");}

    const auth = request.headers.authorization;

    if (!auth) {throw new Error("Không đúng Authurization header.")}

    const parts = auth.trim().split(/\s+/);
    if (parts.length < 2 || parts[0].toLocaleLowerCase() !== "bearer") {
            throw new Error ("Sai định dạng token. Đúng Bearer <token>");
        }
        const token = parts[parts.length - 1]
        if (!token) {
            throw new Error ("Không có token để kiểm tra.")
        }

        if (await KiemTraTokenThuHoi(token)){
            throw new Error ("Token đã bị thu hồi.");
        }
        const payload = checkAccessToken(token);

        if (!payload?.userId || !payload?.role) {
            throw new Error ("Lỗi token. Thiếu userId/role");
        }

        const user = {userId: payload.userId, role: payload.role};
        (request as any).user = user;
        
        return user;

}