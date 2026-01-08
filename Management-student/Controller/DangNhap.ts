import { Controller, Get, Post, Put, Delete, Route, Body, SuccessResponse, Tags, Security, Path, Request } from "tsoa";
import { SinhVienServices } from "../Service/SinhVien";
import { checkRefreshToken, TaoAcessToken, TaoRefreshToken, KiemTraTokenThuHoi, LuuTokenBiThuHoiVaoDatabase } from "../Middleware/XuLyToken";
import { DangNhapDto } from "../Dtos/DangNhap/DangNhapDto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { GiangVienServices } from "../Service/GiangVien";

@Route("API/v1/DangNhap")
@Tags("DangNhap")

// Tạo ra một class chứa các function CRUD để call API và gọi xuống tầng service
export class DangNhap extends Controller {

    private svservices = new SinhVienServices();
    private gvsersvice = new GiangVienServices()

    // Hàm dùng để call tới chức năng login của service sau đó kiểm tra và thực thi nó
    @Post("Login/{UserName}/{Password}")
    @SuccessResponse(200, "Đăng nhập thành công")
    public async Login(@Body() body: DangNhapDto): Promise<any> {
        try {
            const dangnhap = plainToInstance(DangNhapDto, body);
            const checkdangnhap = await validate(dangnhap)

            if (checkdangnhap.length > 0) {
                throw new Error(`Lỗi thông tin đăng nhập: ${JSON.stringify(checkdangnhap)}`)
            }
            try {
                const user = await this.svservices.DangNhap(body.UserName, body.Password)

                return {
                    message: "Đăng nhập thành công: ", ...user
                }
            } catch {}

            const user = await this.gvsersvice.DangNhap(body.UserName, body.Password)

            return {
                message: "Đăng nhập thành công: ", ...user
            }

        } catch (error: any) {
            throw new Error(`Lỗi Controller/DangNhap: ${error.message}`);
        }
    }

    // Hàm dùng để call tới chức năng login lại của service sau đó kiểm tra và thực thi nó
    @Post("LoginAgain")
    @SuccessResponse(200, "Đăng nhập lại thành công")
    public async LoginAgain(@Body body: {RefreshToken: string}): Promise <any> {
        try {
            if (!body.RefreshToken) {
                this.setStatus(400);
                return {message: "Sai refresh token."};

            }
            if (await KiemTraTokenThuHoi(body.RefreshToken)) {
                this.setStatus(401);
                return {message: "Giải mã refresh token."};
            }
            const payload = checkRefreshToken(body.RefreshToken);
            const newAccessToken = TaoAcessToken({ userId: payload.userId, role: payload.role })

            return {AccessToken: newAccessToken};
        } catch (error: any) {
            throw new Error(`Lỗi Controller/LoginAgain: ${error.message}`);
        }
    }

    // Hàm dùng để call tới chức năng logout của service sau đó kiểm tra và thực thi nó
    @Post("Logout")
    @SuccessResponse(200, "Logout thành công")
    public async Logout(@Body() body: {RefreshToken: string}): Promise<any> {
        if (!body.RefreshToken) {
            this.setStatus(400);
            return {message: "Không có Refreshtoken."}
        }

        await LuuTokenBiThuHoiVaoDatabase(body.RefreshToken);
        return {message: "Loggout successful."}
    }
}