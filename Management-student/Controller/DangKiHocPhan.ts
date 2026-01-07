import { Controller, Get, Post, Put, Delete, Route, Body, SuccessResponse, Tags, Security, Path, Request } from "tsoa";
import { DangKihocPhanServices } from "../Service/DangKiHocPhan"
import { plainToInstance } from "class-transformer"
import { CreateDangKihocPhan } from "../Dtos/DangKiHocPhan/CreaateDangKiHocPhan"
import { validate } from "class-validator"
import { UpdateDangKihocPhan } from "../Dtos/DangKiHocPhan/UpdateDangKiHocPhan"

@Route("API/v1/DangKiHocPhan")
@Tags("DangKiHocPhan")
export class DangKiHocPhanController extends Controller{
    private services = new DangKihocPhanServices()

    @Post("CreateDangKiHocPhan")
    @Security("bearerAuth")
    @SuccessResponse(201, "Tạo thành công")
    public async createDangKiHocPhan(@Body() body: CreateDangKihocPhan, @Request req: any): Promise<any> {
        const dangkihocphan = plainToInstance(CreateDangKihocPhan, body);
        const userRole = req.user?.role;
        const checkdangkihocphan = await validate(dangkihocphan);
        if (checkdangkihocphan.length > 0 ) {
            throw new Error (`Lỗi thông tin khởi tạo: ${JSON.stringify(checkdangkihocphan)}`);
        }
        try {
            const create = await this.services.createOneDangKiHocPhan(userRole, dangkihocphan);
            return {
                message: "Đã cập nhập thông tin đăng kí học phần xuống database thành công",
                data: create
            }
        } catch (error: any) {
            throw new Error (`Lỗi Controller/DangKiHocPhan/createDangKiHocPhan: ${error}`)
        }
    }

    @Get("TimKiemLopHocPhanDaDangKi/{MasoSinhVien}/{MaMonHoc}")
    @Security("bearerAuth")
    @SuccessResponse(200, "Tìm kiếm thành công")
    public async TImKiemLopHocPhanDaDangKi(@Path() MasoSinhVien: string, @Path() MaMonHoc: string) {
        try {
            const lophocphan = await this.services.TimKiemLopHocPhanTheoMSSVvaMHH(MasoSinhVien, MaMonHoc);

            return {
                message: "Đã tìm kiếm thấy thông tin mã lớp học phần.",
                data: lophocphan
            }
        } catch (error: any) {
            throw new Error (`Lỗi Controller/DangKiHocPhan/TImKiemLopHocPhanDaDangKi: ${error}`)
        }
    }

    @Put("DoiLophocPhan/{MasoSinhVien}/{MaMonHoc}/{MaLopHocPhan}")
    @Security("bearerAuth")
    @SuccessResponse(200, "Đã đổi học phần thành công")
    public async doiLophocPhan(@Path() MasoSinhVien: string, @Path() MaMonHoc: string, @Path() MaLopHocPhan: string, @Request req: any): Promise<any> {
        const userRole = req.user?.role;
        try {
            const update = await this.services.DoiLopHocPhan(userRole, MasoSinhVien, MaMonHoc, MaLopHocPhan)
            return {
                message: "Đã thay đổi lớp học phần thành công.",
                data: update
            }
        } catch (error: any) {
            throw new Error (`Lỗi Controller/DangKiHocPhan/doiLophocPhan: ${error}`)
        }

    }

    @Delete("HuyDangKiHocPhan/{MasoSinhVien}/{MaMonHoc}")
    @Security("bearerAuth")
    @SuccessResponse(200, "Huỷ thành công")
    public async huyDangKiHocPhan(@Path() MasoSinhVien: string, @Path() MaMonHoc: string, @Request req: any) {
        try {
            const userRole = req.user?.role;
            await this.services.HuyDangKiMotMonHoc(userRole, MasoSinhVien, MaMonHoc)

            return {
                message: "Đã huỷ đăng kí học phần thành công."
            }
        } catch (error: any) {
            throw new Error (`Lỗi Controller/DangKiHocPhan/huyDangKiHocPhan: ${error}`)
        }
    }
}

