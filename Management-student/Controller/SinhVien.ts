import { Controller, Get, Post, Put, Delete, Route, Body, SuccessResponse, Tags, Security, Path, Request } from "tsoa";
import { SinhVienServices } from "../Service/SinhVien"
import { VaiTroNguoiDung } from "../Enums/Enums"
import { CreateSinhVien } from "../Dtos/SinhVien/CreateSinhVien"
import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { UpdateSinhVien } from "../Dtos/SinhVien/UpdateSinhVien"
import { checkRefreshToken, TaoAcessToken, TaoRefreshToken } from "../Middleware/XuLyToken";

@Route("API/v1/SinhVien")
@Tags("SinhVien")

// Tạo ra một class chứa các function CRUD để call API và gọi xuống tầng service
export class SinhVienController extends Controller {
    private services = new SinhVienServices()

    // Hàm dùng để call tới chức năng create sinh viên của service sau đó kiểm tra và thực thi nó
    @Post("PostSinhVien")
    @Security("bearerAuth")
    @SuccessResponse(201, "Insert sinh viên thành công")
    public async PostSinhVien(@Body() body: CreateSinhVien, @Request req: any): Promise<any> {

        const userRole = req.user?.role;
        const sinhvien = plainToInstance(CreateSinhVien, body);

        const checkSinhVien = await validate(sinhvien);
        if (checkSinhVien.length > 0) {
            throw new Error (`Invalid data: ${JSON.stringify(checkSinhVien)}`);
        }

        try {
            const createSinhVien = await this.services.createSinhVien(userRole, sinhvien);

            return {
                message: "Insert sinh viên xuống database thành công.",
                data: createSinhVien,
            }
        } catch (error: any) {
            throw new Error(`Lỗi Controller/SinhVien/PostSinhVien: ${error.message}`);
        }
    }

    // Hàm dùng để call tới chức năng lấy thông tin một sinh viên của service sau đó kiểm tra và thực thi nó
    @Get("GetOneSinhVien/{MasoSinhVien}")
    @Security("bearerAuth")
    @SuccessResponse("200", "Lấy thông tin sinh viên thành công")
    public async GetOneSinhVien(@Path() MasoSinhVien: string): Promise<any>{
        try {
            const getsinhvien = await this.services.TimKiemMotSinhVienTheoMaSo(MasoSinhVien);

            return {
                message: "Đã tìm kiếm sinh viên thành công. Thông tin sinh viên: ",
                data: getsinhvien
            }
        } catch (error: any) {
            throw new Error(`Lỗi Controller/SinhVien/GetOneSinhVien: ${error.message}`);
        }

    }

    // Hàm dùng để call tới chức năng lấy thông tin tất cả sinh viên của service sau đó kiểm tra và thực thi nó
    @Get("GetAllSinhVien")
    @Security("bearerAuth")
    @SuccessResponse(200, "Lấy thông tin tất cả sinh viên thành công")
    public async GetAllSinhVien(@Request() req: any): Promise <any>{
        try {
            const userRole = req.user?.role;
            const sinhviens = await this.services.LietKeThongTinTatCaCacSinhVien(userRole);

            return {
                message: "Đã lấy thông tin tất cả sinh viên thành công.",
                data: sinhviens,
            }
        } catch (error: any) {
            throw new Error (`Lỗi Controller/SinhVien/GetAllSinhVien: ${error}`);
        }
    }

    // Hàm dùng để call tới chức năng cập nhập thông tin một sinh viên của service sau đó kiểm tra và thực thi nó
    @Put("UpdateOneSinhVien/{MasoSinhVien}")
    @Security("bearerAuth")
    @SuccessResponse(200, "Cập nhập thông tin sinh viên thành công.")
    public async UpdateOneSinhVien(@Path() MasoSinhVien: string, @Body() body: UpdateSinhVien, @Request req: any): Promise<any> {
        const update = plainToInstance(UpdateSinhVien, body);
        const checkUpdate = await validate(update);
        const userRole = req.user?.role;
        if (checkUpdate.length > 0) {
            throw new Error(`Lỗi thông tin cập nhập ${JSON.stringify(checkUpdate)}`);
        }
        try {
            const updatesinhvien = await this.services.CapNhapThongTinMotSinhVien(userRole, MasoSinhVien, update);

            return {
                message: "Đã cập nhập thông tin sinh viên thành công",
                data: updatesinhvien,
            }
        } catch (error: any) {
            throw new Error (`Lỗi Controller/SinhVien/UpdateOneSinhVien: ${error}`);
        }
    }

    // Hàm dùng để call tới chức năng xoá thông tin một sinh viên của service sau đó kiểm tra và thực thi nó
    @Delete("DeleteOneSinhVien/{MasoSinhVien}")
    @Security("bearerAuth")
    @SuccessResponse(200, "Xoá sinh viên thành công.")
    public async DeleteOneSinhVien(@Path() MasoSinhVien: string, @Request req: any): Promise<any> {
        try {
            const userRole = req.user?.role;
            await this.services.XoaThongTinMotSinhVien(userRole, MasoSinhVien);
            return {
                message: "Đã xoá sinh viên thành công.",
            }
        } catch (error: any) {
            throw new Error (`Lỗi Controller/SinhVien/DeleteOneSinhVien: ${error}`);
        }
    }
    
}

