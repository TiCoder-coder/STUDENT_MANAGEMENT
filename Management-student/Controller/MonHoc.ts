import { Controller, Get, Post, Put, Delete, Route, Body, SuccessResponse, Tags, Security, Path, Request } from "tsoa";
import { MonHocServices } from "../Service/MonHoc"
import { plainToInstance } from "class-transformer"
import { CreateMonHoc } from "../Dtos/MonHoc/CreateMonHoc"
import { validate } from "class-validator"
import { UpdateMonHoc } from "../Dtos/MonHoc/UpdateMonHoc"

@Route("API/v1/MonHoc")
@Tags("MonHoc")
export class MonHocController extends Controller {
    
    private services = new MonHocServices()

    @Post("CreateMonHoc")
    @Security("bearerAuth")
    @SuccessResponse(201, "Tạo thành công.")
    public async createMonHoc(@Body() body: CreateMonHoc, @Request req: any): Promise<any> {
        const monhoc = plainToInstance(CreateMonHoc, body)
        const userRole = req.user?.role;

        const checkmonhoc = await validate(monhoc)

        if (checkmonhoc.length > 0) { throw new Error (`Lỗi thông tin khởi tạo môn học: ${JSON.stringify(checkmonhoc)}`)}

        try {
            const create = await this.services.createMonHoc(userRole, monhoc);
            return {
                message: "Đã insert thông tin môn học xuống databse thành công",
                data: create,
            }
        } catch (error: any) {
            throw new Error (`Lỗi Controller/Monhoc/createMonHoc: ${error}`)
        }
    }

    @Get("GetOneMonHoc/{MaMonHoc}")
    @Security("bearerAuth")
    @SuccessResponse(200, "Tìm kiếm thành công")
    public async getOneMonHoc(@Path() MaMonHoc: string): Promise<any> {
        try {
            const getmonhoc = await this.services.findOneMonHoc(MaMonHoc);
            return {
                message: "Đã tìm kiếm thông tin môn học thành công",
                data: getmonhoc
            }
        } catch (error: any) {
            throw new Error (`Lỗi Controller/Monhoc/getOneMonHoc: ${error}`)
        }        
    }

    @Get("GetAllMonHoc")
    @Security("bearerAuth")
    @SuccessResponse(200, "Liệt kê thành công")
    public async getAllMonHoc(@Request() req: any): Promise<any> {
        try {
            const userRole = req.user?.role;
            const getmonhocs = await this.services.ListAllMonHoc(userRole)
            return {
                message: "Đã liệt kê thông tin tất cả các môn học thành công",
                data: getmonhocs
            }
        } catch (error: any) {
            throw new Error (`Lỗi Controller/Monhoc/getAllMonHoc: ${error}`)
        }
    }

    @Put("CapNhapMonHoc/{MaMonHoc}")
    @Security("bearerAuth")
    @SuccessResponse(200, "Cập nhập thành công")
    public async CapNhapMonHoc(@Path() MaMonHoc: string, @Body() body: UpdateMonHoc, @Request req: any): Promise<any> {
        const monhoc = plainToInstance(UpdateMonHoc, body)

        const checkmonhoc = await validate(monhoc)
        if (checkmonhoc.length > 0) { throw new Error (`Sai thông tin cập nhập: ${JSON.stringify(monhoc)}`)}
        try {
            const userRole = req.user?.role;
            const update = await this.services.UpdateOneMonHoc(userRole, MaMonHoc, monhoc)
            return {
                message: "Đã cập nhập thông tin sinh viên thành công",
                data: update
            }
        } catch (error: any) {
            throw new Error (`Lỗi Controller/Monhoc/DeleteMonHoc: ${error}`)
        }
    }

    @Delete("DeleteMonHoc/{MaMonHoc}")
    @Security("bearerAuth")
    @SuccessResponse(200, "Xoá thành công")
    public async DeleteMonHoc(@Path() MaMonHoc: string, @Request req: any): Promise<any> {
        try {
            const userRole = req.user?.role;
            await this.services.DeleteOneMonHoc(userRole, MaMonHoc)
            return {
                message: "Đã xoá thông tin sinh viên thành công",
            }
        } catch (error: any) {
            throw new Error (`Lỗi Controller/Monhoc/DeleteMonHoc: ${error}`)
        }

    }
}

