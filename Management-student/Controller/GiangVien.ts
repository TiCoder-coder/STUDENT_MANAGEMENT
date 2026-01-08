import { Controller, Get, Post, Put, Delete, Route, Body, SuccessResponse, Tags, Security, Path, Request } from "tsoa";
import { GiangVienServices } from "../Service/GiangVien";
import { CreateGiangVien } from "../Dtos/GiangVien/CreateGiangVien";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateGiangVien } from "../Dtos/GiangVien/UpdateGiangVien";

@Route("API/v1/GiangVien")
@Tags("GiangVien")

// Tạo ra một class chứa các function CRUD để call API và gọi xuống tầng service
export class GiangVienController extends Controller{
    private services = new GiangVienServices()

    // Hàm dùng để call tới chức năng create giảng viên của service sau đó kiểm tra và thực thi nó
    @Post("CreateGiangVien")
    @Security("bearerAuth")
    @SuccessResponse(201, "Insert giảng viên thành công")
    public async PostGiangVien(@Body() body: CreateGiangVien, @Request req: any): Promise<any> {
        const giangvien = plainToInstance(CreateGiangVien, body)
        const userRole = req.user?.role;
        const checkGiangVien = await validate(giangvien);
        if (checkGiangVien.length > 0) {
            throw new Error (`Invalid data: ${JSON.stringify(checkGiangVien)}`)
        }

        try {
            const createGiangVien = await this.services.createGiangVien(userRole, giangvien)

            return {
                message: "Insert giảng viên xuống database thành công.",
                data: createGiangVien,
            }
        } catch (error: any) {
            throw new Error(`Lỗi Controller/GiangVien/PostGiangVien: ${error.message}`)
        }
    }

    // Hàm dùng để call tới chức năng lấy thông tin giảng viên của service sau đó kiểm tra và thực thi nó
    @Get("GetOneGiangVien/{MaSoGiangVien}")
    @Security("bearerAuth")
    @SuccessResponse("200", "Lấy thông tin giảng viên thành công")
    public async GetOneGiangVien(@Path() MaSoGiangVien: string, @Request req: any): Promise<any> {
        try {
            const userRole = (req as any).user?.role;
            const getgiangvien = await this.services.TimKiemMotGiangVienTheoMaSo(userRole, MaSoGiangVien)

            return {
                message: "Đã tìm kiếm giảng viên thành công. Thông tin giảng viên: ",
                data: getgiangvien
            }
        } catch (error: any) {
            throw new Error(`Lỗi Controller/GiangVien/GetOneSinhVien: ${error.message}`)
        }

    }

    // Hàm dùng để call tới chức năng lấy thông tin tất cả sinh viên của service sau đó kiểm tra và thực thi nó
    @Get("GetAllGiangVien")
    @Security("bearerAuth")
    @SuccessResponse(200, "Lấy thông tin tất cả giảng viên thành công")
    public async GetAllSinhVien(@Request() req: any): Promise<any>{
        try {
            const userRole =req.user?.role;
            const giangviens = await this.services.LietKeThongTinTatCaCacGiangVien(userRole)

            return {
                message: "Đã lấy thông tin tất cả giảng viên thành công.",
                data: giangviens
            }
        } catch (error: any) {
            throw new Error (`Lỗi Controller/GiangVien/GetAllSinhVien: ${error}`)
        }
    }

    // Hàm dùng để call tới chức năng update giảng viên của service sau đó kiểm tra và thực thi nó
    @Put("UpdateOneGiangVien/{MaSoGiangVien}")
    @Security("bearerAuth")
    @SuccessResponse(200, "Cập nhập thông tin giảng viên thành công.")
    public async UpdateOneGiangVien(@Path() MaSoGiangVien: string, @Body() body: UpdateGiangVien, @Request req: any): Promise<any> {
        const update = plainToInstance(UpdateGiangVien, body)
        const userRole = req.user?.role;
        const checkUpdate = await validate(update)

        if (checkUpdate.length > 0) {
            throw new Error(`Lỗi thông tin cập nhập ${JSON.stringify(checkUpdate)}`)
        }
        try {
            const updategiangvien = await this.services.CapNhapThongTinMotGiangVien(userRole, MaSoGiangVien, update)

            return {
                message: "Đã cập nhập thông tin giảng viên thành công",
                data: updategiangvien,
            }
        } catch (error: any) {
            throw new Error (`Lỗi Controller/GiangVien/UpdateOneSinhVien: ${error}`)
        }
    }

    // Hàm dùng để call tới chức năng xoá thông tin một giảng viên của service sau đó kiểm tra và thực thi nó
    @Delete("DeleteOneGiangVien/{MaSoGiangVien}")
    @Security("bearerAuth")
    @SuccessResponse(200, "Xoá giảng viên thành công.")
    public async DeleteOneSinhVien(@Path() MaSoGiangVien: string, @Request req: any): Promise<any> {
        try {
            const userRole = req.user?.role;
            await this.services.XoaThongTinMotGiangVien(userRole, MaSoGiangVien)
            return {
                message: "Đã xoá giảng viên thành công.",
            }
        } catch (error: any) {
            throw new Error (`Lỗi Controller/GiangVien/DeleteOneSinhVien: ${error}`)
        }
    }
}

