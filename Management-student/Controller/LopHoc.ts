import { Controller, Get, Post, Put, Delete, Route, Body, SuccessResponse, Tags, Security, Path, Request } from "tsoa";
import { LopHocPhanServices } from "../Service/LopHocPhan"
import { plainToInstance } from "class-transformer"
import { CreateGiangVien } from "../Dtos/GiangVien/CreateGiangVien"
import { validate } from "class-validator"
import { CreateMaLopHocPhan } from "../Dtos/LopHocPhan/CreateLopHocPhan"
import { UpdateMaLopHocPhan } from "../Dtos/LopHocPhan/UpdateLopHocPhan"

@Route("API/v1/LopHoc")
@Tags("LopHoc")
export class LopHocController extends Controller {
    
    private services = new LopHocPhanServices()

    @Post("CreateLopHoc")
    @Security("bearerAuth")
    @SuccessResponse(201, "Tạo thành công")
    public async createLopHoc(@Body() body: CreateMaLopHocPhan, @Request req: any): Promise<any> {
        const lophocphan = plainToInstance(CreateMaLopHocPhan, body)
        const userRole = req.user?.role;
        const checklophocphan = await validate(lophocphan)
        if (checklophocphan.length > 0) {
            throw new Error(`Lỗi thông tin: ${JSON.stringify(checklophocphan)}`)
        }
        try {
            const create = await this.services.createOneLopHocPhan(userRole, lophocphan)

            return {
                message: "Đã insert thông tin lớp học phần xuống database thành công.",
                data: create
            }
        } catch (error: any) {
            throw new Error (`Lỗi Controller/LopHoc/createLopHoc: ${error}`);
        }
    }

    @Get("GetOneLopHoc/{MaLopHocPhan}")
    @Security("bearerAuth")
    @SuccessResponse(200, "Tìm kiếm thành công")
    public async getOneLopHoc(@Path() MaLopHocPhan: string): Promise<any> {
        try {
            const search = await this.services.findOneLopHocPhan(MaLopHocPhan)
            
            return {
                message: "Đã tìm kiếm thông tin lớp học thành công.",
                data: search
            }
        } catch (error: any) {
            throw new Error(`Lỗi Controller/LopHoc/getOneLopHoc: ${error}`)
        }
    }

    @Get("GetAllLopHoc")
    @Security("bearerAuth")
    @SuccessResponse(200, "Liệt kê thành công")
    public async getAllLopHoc(@Request() req: any): Promise<any> {
        try {
            const userRole = req.user?.role;
            const lophocs = await this.services.findAllLopHocPhan(userRole)
            return {
                message: "Đã liệt kê thông tin của tất cả các lớp học phần thành công.",
                data: lophocs
            }
        } catch (error: any) {
            throw new Error(`Lỗi Controller/LopHoc/getAllLopHoc: ${error}`)
        }
    }

    @Put("UpdateLopHoc/{MaLopHocPhan}")
    @Security("bearerAuth")
    @SuccessResponse(200, "Cập nhập thành công")
    public async updateMonHoc(@Path() MaLopHocPhan: string, @Body() body: UpdateMaLopHocPhan, @Request req: any): Promise<any> {
        const lophoc = plainToInstance(UpdateMaLopHocPhan, body)
        const checklophoc = await validate(lophoc)
        const userRole = req.user?.role;
        if (checklophoc.length > 0) { throw new Error(`Lỗi thông tin cập nhập: ${checklophoc}`)}
        try {
            const update = await this.services.UpdateOneMonHoc(userRole, MaLopHocPhan, lophoc);
            return {
                message: "Đã cập nhập thông tin xuống database thành công",
                data: update
            }
        } catch (error: any) {
            throw new Error(`Lỗi Controller/LopHoc/updateMonHoc: ${error}`)
        }
    }

    @Delete("DeleteMonHoc/{MaLopHocPhan}")
    @Security("bearerAuth")
    @SuccessResponse(200, "Xoá thành công")
    public async deleteMonHoc(@Path() MaLopHocPhan: string, @Request req: any): Promise<any> {
        try {
            const userRole = req.user?.role;
            await this.services.DeleteOneLopHocPhan(userRole, MaLopHocPhan)

            return {
                message: "Đã xoá thông tin thành công."
            }
        } catch (error: any) {
            throw new Error(`Lỗi Controller/LopHoc/deleteMonHoc: ${error}`)
        }
    }
}

