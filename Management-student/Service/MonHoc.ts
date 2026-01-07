import { CreateMonHoc } from "../Dtos/MonHoc/CreateMonHoc";
import { UpdateMonHoc } from "../Dtos/MonHoc/UpdateMonHoc";
import { HinhThucHoc, MonHocBatBuoc } from "../Enums/Enums";
import { RequireAdmin } from "../Middleware/PhanQuyen";
import { MonHoc, MonHocRepositories } from "../Repositories/MonHoc";
import { ChuanHoaHoTen } from "./SinhVien";

// Hàm dùng để tạo ra các phương thức CRUD cho môn học
export class MonHocServices{

    // Hàm dùng để insert thông tin của một sinh viên xuống database
    async createMonHoc(UserRole: string, monhoc: CreateMonHoc){
        try {

            RequireAdmin(UserRole)              // Chỉ có admin mới được insert thông tin xuống database
            
            // Kiểm tra môn học xem có tồn tại trước đó hay không
            const monhocRepositories = new MonHocRepositories();
            const checkMonHoc = await monhocRepositories.FindOneMonHoc(monhoc.MaMonHoc);
            if (checkMonHoc){throw new Error("Môn học đã tồn tại. Không thể tạo mới được nữa."); }

            // kiểm tra thuộc tính bắt buộc có thuộc enum hay không
            if (monhoc.BatBuoc !== MonHocBatBuoc.Co && monhoc.BatBuoc !== MonHocBatBuoc.Khong){
                throw new Error ("Thuộc tính BatBuoc phải là Co hoặc Khong.")
            }

            // Kiểm tra hình thức học có thuộc enum hay không
            if (monhoc.HinhThucHoc !== HinhThucHoc.Offline && monhoc.HinhThucHoc !== HinhThucHoc.Online){
                throw new Error ("Thuộc tính HinhThucHoc phải là Offline hoặc Online.")
            }

            // Kiểm tra số tín chỉ
            if (monhoc.SoTinChi < 0){
                throw new Error("Số tín chỉ không được nhỏ hơn 0.")
            }
            
            // Kiểm tra học phí môn học
            if (monhoc.HocPhiMonHoc < 0){
                throw new Error("Số tín chỉ không được nhỏ hơn 0.")
            }

            // Kiểm tra xem mã lớp học phần cho môn học có tồn tại không
            // const checkMaLopHocPhan = await monhocRepositories.FindMonHocTheoMaHocPhan(monhoc.MaLopHocPhan);
            // if (checkMaLopHocPhan){throw new Error("Mã lớp học phần của môn học đã tồn tại."); }

            // Nếu các thông tin đã chuẩn thì tiến hành thực thi vào database
            monhoc.TenMonHoc = ChuanHoaHoTen(monhoc.TenMonHoc);
            await monhocRepositories.CreateOneMonHoc(monhoc);
            return {
                    MaMonHoc: monhoc.MaMonHoc,
                    TenMonHoc: monhoc.TenMonHoc,
                    BatBuoc: monhoc.BatBuoc,
                    SoTinChi: monhoc.SoTinChi,
                    HinhThucHoc: monhoc.HinhThucHoc,
                    HocPhiMonHoc: monhoc.HocPhiMonHoc
                    // MaLopHocPhan: monhoc.MaLopHocPhan,
                }

        } catch (error: any) {
            throw new Error (`Lỗi Service/MonHoc/createMonHoc: ${error}`);
        }
    }

    // Hàm dùng để tìm kiếm thông tin một môn học
    async findOneMonHoc(MaMonHoc: string){
        try {

            const monhocRepositories = new MonHocRepositories();
            const checkMonHoc = await monhocRepositories.FindOneMonHoc(MaMonHoc);
            if (checkMonHoc){
                return {
                    MaMonHoc: checkMonHoc.MaMonHoc,
                    TenMonHoc: checkMonHoc.TenMonHoc,
                    BatBuoc: checkMonHoc.BatBuoc,
                    SoTinChi: checkMonHoc.SoTinChi,
                    HinhThucHoc: checkMonHoc.HinhThucHoc,
                    HocPhiMonHoc: checkMonHoc.HocPhiMonHoc
                    // MaLopHocPhan: checkMonHoc.MaLopHocPhan
                }
            }

        } catch (error: any) {
            throw new Error (`Lỗi Service/MonHoc/findOneMonHoc: ${error}`);
        }
    }

    // Hàm dùng để liệt kê thông tin của tất cà các môn học 
    async ListAllMonHoc(userRole: string){
        try {
            RequireAdmin(userRole)
            const monhocRepositories = new MonHocRepositories();
            const checkMonHocs = await monhocRepositories.FindAllMonHoc();
            if (checkMonHocs.length > 0){
                return checkMonHocs.map((checkMonHoc) => ({
                    MaMonHoc: checkMonHoc.MaMonHoc,
                    TenMonHoc: checkMonHoc.TenMonHoc,
                    BatBuoc: checkMonHoc.BatBuoc,
                    SoTinChi: checkMonHoc.SoTinChi,
                    HinhThucHoc: checkMonHoc.HinhThucHoc,
                    HocPhiMonHoc: checkMonHoc.HocPhiMonHoc
                    // MaLopHocPhan: checkMonHoc.MaLopHocPhan
                }))
            } else {
                throw new Error("Không tìm thấy môn học nào.");
            }

        } catch (error: any) {
            throw new Error (`Lỗi Service/MonHoc/ListAllMonHoc: ${error}`);
        }
    }

    // Hàm dùng để cập nhập thông tin cho một môn học 
    async UpdateOneMonHoc(UserRole: string, MaMonHoc: string, update: UpdateMonHoc){
        try{

            RequireAdmin(UserRole)
            
            const keys: (keyof MonHoc)[] = [];
            const values: any[] = [];

            const monhocRepositories = new MonHocRepositories();
            const checkMonHoc = await monhocRepositories.FindOneMonHoc(MaMonHoc);
            if (!checkMonHoc){throw new Error("Không tồn tại thông tin môn học để update."); }

            if (update.MaMonHoc){
                keys.push("MaMonHoc");
                values.push(update.MaMonHoc);
            }

            if (update.TenMonHoc){
                update.TenMonHoc = ChuanHoaHoTen(update.TenMonHoc)
                keys.push("TenMonHoc");
                values.push(update.TenMonHoc);
            }

            if (update.BatBuoc !== MonHocBatBuoc.Co && update.BatBuoc !== MonHocBatBuoc.Khong){
                throw new Error ("Thuộc tính BatBuoc phải là Co hoặc Khong.")
            } else {
                keys.push("BatBuoc")
                values.push(update.BatBuoc)
            }

            if (update.SoTinChi < 0){
                throw new Error("Số tín chỉ không được nhỏ hơn 0.")
            } else {
                keys.push("SoTinChi")
                values.push(update.SoTinChi)
            }
            
            if (update.HocPhiMonHoc < 0){
                throw new Error("Học phí môn không được nhỏ hơn 0.")
            } else {
                keys.push("HocPhiMonHoc")
                values.push(update.HocPhiMonHoc)
            }
            if (update.HinhThucHoc !== HinhThucHoc.Offline && update.HinhThucHoc !== HinhThucHoc.Online){
                throw new Error ("Thuộc tính HinhThucHoc phải là Offline hoặc Online.")
            } else {
                keys.push("HinhThucHoc")
                values.push(update.HinhThucHoc)
            }
            
            // const checkMaLopHocPhan = await monhocRepositories.FindMonHocTheoMaHocPhan(update.MaLopHocPhan);
            // if (checkMaLopHocPhan){
            //     throw new Error("Mã lớp học phần của môn học đã tồn tại."); 
            // }  else {
            //     keys.push("MaLopHocPhan")
            //     values.push(update.MaLopHocPhan)
            // }

            const ThongtinUpdate: Record<string, any> = {};
            for (let i = 0; i < keys.length; i++){
                ThongtinUpdate[keys[i]] = values[i];
            }

            if (Object.keys(ThongtinUpdate).length === 0){
                return "Không có thông tin để cập nhập."
            }

            await monhocRepositories.UpdateOneMonHoc(MaMonHoc, ThongtinUpdate);
            return {
                MaMonHoc: update.MaMonHoc,
                TenMonHoc: update.TenMonHoc,
                BatBuoc: update.BatBuoc,
                SoTinChi: update.SoTinChi,
                HinhThucHoc: update.HinhThucHoc,
                HocPhiMonHoc: update.HocPhiMonHoc
                // MaLopHocPhan: update.MaLopHocPhan
            }
        } catch (error: any) {
            throw new Error (`Lỗi Service/MonHoc/UpdateOneMonHoc: ${error}`);
        }
    }

    // Hàm dùng để xoá thông tin của một môn học 
    async DeleteOneMonHoc(UserRole: string, MaMonHoc: string){
        try {

            RequireAdmin(UserRole);

            const monhocRepositories = new MonHocRepositories();
            const checkMonHoc = await monhocRepositories.FindOneMonHoc(MaMonHoc);
            if (!checkMonHoc){
                throw new Error( "Không tồn tại thông tin môn học để delete."); 
            } else {
                await monhocRepositories.DeleteOneMonHoc(MaMonHoc);
                return "Đã xoá môn học thành công."
            }
            
        } catch (error: any) {
            throw new Error (`Lỗi Service/MonHoc/DeleteOneMonHoc: ${error}`);
        }

    }
}