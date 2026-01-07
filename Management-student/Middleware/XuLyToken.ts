import jwt, { Jwt, type JwtPayload, SignOptions } from "jsonwebtoken";
import { Collection, MongoClient } from "mongodb";
import { getCollection } from "../ConnectDatabase/ConnectDatabase";
import "dotenv/config";
import { randomUUID } from "node:crypto";

// Load các key trong .env lên đẻ sử dụng
const SECRET_KEY=process.env.SECRET_KEY as string;
const PASSWORD_PEPPER=process.env.PASSWORD_PEPPER as string;
const JWT_SECRET=process.env.JWT_SECRET as string;
const THOIGIANHETHANACESSTOKOEN=Number(process.env.THOIGIANHETHANACESSTOKOEN);
const THOIGIANHETHANCUAREFRESHTOKEN=Number(process.env.THOIGIANHETHANCUAREFRESHTOKEN);
const MONGO_URI=process.env.MONGO_URI as string;
const REVOKED_COLLECTION=process.env.REVOKED_COLLECTION as string;
const MONGO_NAME=process.env.MONGO_NAME as string;
const JWT_ALGORITHM=process.env.JWT_ALGORITHM as jwt.Algorithm;
const ISSUER = process.env.ISSUER as string;
const AUDIENCE = process.env.AUDIENCE as string;

// if (!SECRET_KEY || !PASSWORD_PEPPER || !JWT_SECRET || !THOIGIANHETHANACESSTOKOEN ||
//      !THOIGIANHETHANCUAREFRESHTOKEN || !MONGO_URI|| !MONGO_NAME || !JWT_ALGORITHM || !REVOKED_COLLECTION) { throw new 
//         Error("Lỗi. Thiếu các keys quan trọng.")}

export type UserJWT = {
    sub: string;
    username: string;
    role: string;
};

// Định nghĩa các Payload cho token (Access token và Refresh token)
export type AccessTokenPayload = UserJWT & {
    token_type: "Access";
    jti: string;
}

export type RefreshTokenPayload = UserJWT & {
    token_type: "Refresh";
    jti: string;
}
export interface TokenPayload {
    userId: string;
    role: string;
}
//---------------------------------------------------------------------------------------------------------------------
let LuuTruTokenBiThuHoi: Collection | null = null;                          // Biến dùng để lưu trữ token bị thu hồi
//---------------------------------------------------------------------------------------------------------------------

// Hàm dùng để lưu trữ token đã được thu hồi xuống database
export async function LuuTokenBiThuHoiVaoDatabase(token: string){
    const col = (await getCollection("revoked_tokens")) as Collection;
    await col.insertOne({token, revoked_at: new Date()});
}

// Hàm dùng để kiểm tra xem token có thực sự đã lưu vào danh sách đen hay chưa
export async function KiemTraTokenThuHoi(token: string){
    const col = (await getCollection("revoked_tokens")) as Collection;
    const checkTokenThuHoi = await col.findOne({token});
    return !!checkTokenThuHoi;
}

//---------------------------------------------------------------------------------------------------------------------
//------------------------------------------------ ACCESS TOKEN -------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------

// Hàm dùng để tạo ra access token
export function TaoAcessToken(payload: TokenPayload) {

    return jwt.sign(
        {
            userId: String(payload.userId),
            role: String(payload.role),
        }, String(JWT_SECRET), {expiresIn: THOIGIANHETHANACESSTOKOEN});
}

// Hàm dùng để giải mã và check xem access token có đúng không
export function checkAccessToken(token: string): TokenPayload {
     try {
        const decoded = jwt.verify(token, String(JWT_SECRET)) as any;

        return {userId: decoded.userId, role: decoded.role};
     } catch (error: any) {
        throw new Error("Không thể kiểm tra access token.", error);
     }
}

//---------------------------------------------------------------------------------------------------------------------
//------------------------------------------------ REFRESH TOKEN ------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------

// Hàm dùng để tạo ra refresh token
export function TaoRefreshToken(payload: TokenPayload) {
    return jwt.sign(
        {
            userId: String(payload.userId),
            role: String(payload.role),
        }, String(JWT_SECRET), {expiresIn: THOIGIANHETHANCUAREFRESHTOKEN});
}

// Hàm dùng để giải mã refresh token
export function checkRefreshToken(token: string): TokenPayload {
     try {
        const decoded = jwt.verify(token, String(JWT_SECRET)) as any;

        return {userId: decoded.userId, role: decoded.role};
     } catch (error) {
        console.error("Không thể kiểm tra refresh token.", error);
        throw error;
     }
}