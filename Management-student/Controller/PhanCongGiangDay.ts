import { Controller, Get, Post, Put, Delete, Route, Body, SuccessResponse, Tags, Security, Path, Request } from "tsoa";
import { PhanCongGiangDayServices } from "../Service/PhanCongGiangDay"
import { plainToClass, plainToInstance } from "class-transformer"
import { CreatePhanCongGiangDay } from "../Dtos/PhanCongGiangDay/CreatePhanCongGiangDay"
import { validate } from "class-validator"
import { UpdatePhanCongGiangDay } from "../Dtos/PhanCongGiangDay/UpdatePhanCongGiangDay"

@Route("API/v1/PhanCongGiangDay")
@Tags("PhanCongGiangDay")
export class PhanCongGiangDayController extends Controller {
    private services = new PhanCongGiangDayServices()

    @Post("CreatePhanCongGiangDay")
    @Security("bearerAuth")
    @SuccessResponse(201, "Tạo thành công")
    public async createPhanCongGiangDay(@Body() body: CreatePhanCongGiangDay, @Request req: any){
        const userRole = req.user?.role;
        const phanconggiangday = plainToInstance(CreatePhanCongGiangDay, body)
        const checklophocphan = await validate(phanconggiangday)
        if (checklophocphan.length > 0) {
            throw new Error (`Lỗi thông tin cập nhập: ${JSON.stringify(checklophocphan)}`);
        }
        try {
            await this.services.createOnePhanCongGiangDay(userRole, phanconggiangday)
            return {
                message: "Thông tin phân công giảng dạy đã được cập nhập thành công xuồng database.",
                data: phanconggiangday
            }
        } catch (error: any){
            throw new Error (`Lỗi Controller/PhanCongGiangDay/createPhanCongGiangDay: ${error}`)
        }
    }

    @Get("TimkiemPhanCongGiangDay/{MaSoGiangVien}/{MaLopHocPhan}")
    @Security("bearerAuth")
    @SuccessResponse(200, "Tìm kiếm thành công")
    public async timkiemPhanCongGiangDay(@Path() MaSoGiangVien: string, @Path() MaLopHocPhan: string, @Request() req: ExRequest) {
        try {
            const userRole = (req as any).user?.role;
            const phanconggiangday = await this.services.findOnePhanCongGiangDay(userRole, MaSoGiangVien, MaLopHocPhan)
            return {
                message: "Tìm kiếm thông tin phân công giảng dạy thành công",
                data: phanconggiangday
            }
        } catch (error: any){
            throw new Error (`Lỗi Controller/PhanCongGiangDay/timkiemPhanCongGiangDay: ${error}`)
        }
    }

    @Get("LietKePhanCongHocPhan")
    @Security("bearerAuth")
    @SuccessResponse(200, "Liệt kê thành công")
    public async lietKePhanCongHocPhan(@Request() req: any): Promise<any> {
        try {
            const userRole = req.user?.role;
            const phancongs = await this.services.findAllPhanCongGiangDay(userRole)
            return {
                message: "Liệt kê thành công thông tin phân công giảng dạy",
                data: phancongs
            }
        } catch (error: any){
            throw new Error (`Lỗi Controller/PhanCongGiangDay/lietKePhanCongHocPhan: ${error}`)
        }
    }

    @Put("CapNhapLopHocPhan/{MaLopHocPhan}")
    @Security("bearerAuth")
    @SuccessResponse(200, "Cập nhập thành công")
    public async capNhapLopHocPhan(@Path() MaLopHocPhan: string, @Body() body: UpdatePhanCongGiangDay, @Request req: any) {
        const lophoc = plainToInstance(UpdatePhanCongGiangDay, body)
        const userRole = req.user?.role;
        const checklophoc = await validate(lophoc)
        if (checklophoc.length > 0) {
            throw new Error (`Lỗi thông tin cập nhập: ${JSON.stringify(checklophoc)}`);
        }

        try {
            await this.services.updateOnePhanCongGiangDay(userRole, MaLopHocPhan, lophoc)
            return {
                message: "Cập nhập thông tin giảng dạy thành công.",
            }
        } catch (error: any){
            throw new Error (`Lỗi Controller/PhanCongGiangDay/capNhapLopHocPhan: ${error}`)
        }
    }

    @Delete("XoaLopHocPhan/{MaSoGiangVien}/{MaLopHocPhan}")
    @Security("bearerAuth")
    @SuccessResponse(200, "Xoá thành công")
    public async xoaLopHocPhan(@Path() MaSoGiangVien: string, @Path() MaLopHocPhan: string, @Request req: any) {
        try {
            const userRole = req.user?.role;
            await this.services.deleteOnePhanCongGiangDay(userRole, MaSoGiangVien, MaLopHocPhan);

            return {
                message: "Xoá thông tin giảng dạy thành công."
            }
        } catch (error: any){
            throw new Error (`Lỗi Controller/PhanCongGiangDay/xoaLopHocPhan: ${error}`)
        } 
    }
}

