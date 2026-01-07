import { CreatePhanCongGiangDay } from "../Dtos/PhanCongGiangDay/CreatePhanCongGiangDay";
import { UpdatePhanCongGiangDay } from "../Dtos/PhanCongGiangDay/UpdatePhanCongGiangDay";
import { RequireAdmin, RequireGiangVienOrAdmin } from "../Middleware/PhanQuyen";
import { GiangVienRepositories } from "../Repositories/GiangVien";
import { LopHocPhan, LopHocPhanRepositories } from "../Repositories/LopHocPhan";
import { PhanCongGiangDay, PhanCongGiangDayRepositories } from "../Repositories/PhanCongGiangDay";

// Định nghĩa một class gồm các chức năng CRUD cho phân công giảng dạy
export class PhanCongGiangDayServices{

    // Hàm dùng để insert thông tin giảng dạy xuống database
    async createOnePhanCongGiangDay(userRole: string, phancong: CreatePhanCongGiangDay ){
        try {

            RequireAdmin(userRole)
            
            // Kiểm tra có tồn tại giảng viên không để cập nhập
            const giangvienRepositories = new GiangVienRepositories();
            const checkGiangVien = await giangvienRepositories.findoneGiangVien(phancong.MaSoGiangVien);
            if (!checkGiangVien) {
                throw new Error("Giảng viên không tồn tại")
            }

            const lophocphanRepositories = new LopHocPhanRepositories();
            const checkLopHocPhan = await lophocphanRepositories.FindOneLopHocPhan(phancong.MaLopHocPhan);
            if (!checkLopHocPhan) { throw new Error("Lớp học phần không tồn tại."); }


            const phanconggiangdayRepositories = new PhanCongGiangDayRepositories();
            const checkPhanCongGiangDay = await phanconggiangdayRepositories.FindOnePhanCongGiangDay(phancong.MaSoGiangVien, phancong.MaLopHocPhan)
            if (checkPhanCongGiangDay) {
                throw new Error ("Lớp này đã có giáo viên khác dạy.")
            }

            await phanconggiangdayRepositories.CreateOnePhanCongGiangDay(phancong);
            return {
                MaSoGiangVien: phancong.MaSoGiangVien,
                MaLopHocPhan: phancong.MaLopHocPhan,
            }

        } catch (error: any) {
            throw new Error (`Lỗi Service/PhanCongGiangDay/createOnePhanCongGiangDay: ${error}`);
        }
    }

    // Hàm dùng để tìm kiếm thông tin giảng dạy
    async findOnePhanCongGiangDay(userRole: string, MaSoGiangVien: string, MaLopHocPhan: string){
        try {

            RequireGiangVienOrAdmin(userRole)

            const phanconggiangdayRepositories = new PhanCongGiangDayRepositories();
            const checkPhanCongGiangDay = await phanconggiangdayRepositories.FindByMaLopHocPhan(MaLopHocPhan)
            if (!checkPhanCongGiangDay) {
                throw new Error (`Lớp ${MaLopHocPhan} chưa có thông tin phân công giảng dạy.`)
            }

            return checkPhanCongGiangDay;

        } catch (error: any) {
            throw new Error (`Lỗi Service/PhanCongGiangDay/findOnePhanCongGiangDay: ${error}`);
        }
    }

    // Hàm dùng để liệt kê tất cả thông tin giảng dạy
    async findAllPhanCongGiangDay(userRole: string){
        try {

            RequireAdmin(userRole)

            const phanconggiangdayRepositories = new PhanCongGiangDayRepositories();
            const danhSachPhanCongs = await phanconggiangdayRepositories.FindAllPhanCongGiangDay()
            if (danhSachPhanCongs.length > 0) {
                return danhSachPhanCongs.map((danhSachPhanCong) => ({
                    MaSoGiangVien: danhSachPhanCong.MaSoGiangVien,
                    MaLopHocPhan: danhSachPhanCong.MaLopHocPhan
                }));
            } 

        } catch (error: any) {
            throw new Error (`Lỗi Service/PhanCongGiangDay/findAllPhanCongGiangDay: ${error}`);
        }
    }
    
    // Hàm dùng để cập nhập thông tin phân công giảng dạy
    async updateOnePhanCongGiangDay(userRole: string, MaLopHocPhan: string, phancong: UpdatePhanCongGiangDay ){
        try {


            RequireAdmin(userRole)
            const phanconggiangdayRepositories = new PhanCongGiangDayRepositories();
            const checkPhanCongGiangDay = await phanconggiangdayRepositories.FindByMaLopHocPhan(MaLopHocPhan)
            
            const keys: (keyof PhanCongGiangDay)[] = [];
            const values: any[] = [];

            if (phancong.MaLopHocPhan) {
                keys.push("MaLopHocPhan");
                values.push(phancong.MaLopHocPhan);
            }

            if (phancong.MaSoGiangVien) {
                keys.push("MaSoGiangVien");
                values.push(phancong.MaSoGiangVien)
            }

            const ThongTinUpdate: Record<string, any> = {};
            for (let i = 0; i < keys.length; i++){
                ThongTinUpdate[keys[i]] = values[i]
            }
            
            await phanconggiangdayRepositories.UpdateOnePhanCongGiangDay(MaLopHocPhan, ThongTinUpdate)
            return "Đã cập nhập thông tin thành công."

        } catch (error: any) {
            throw new Error (`Lỗi Service/PhanCongGiangDay/updateOnePhanCongGiangDay: ${error}`);
        }
    }

    // Hàm dùng để xoá thông tin phân công giảng dạy
    async deleteOnePhanCongGiangDay(userRole: string, MaSoGiangVien: string, MaLopHocPhan: string){
        try {

            RequireAdmin(userRole)

            const phanconggiangdayRepositories = new PhanCongGiangDayRepositories();
            const checkPhanCongGiangDay = await phanconggiangdayRepositories.FindOnePhanCongGiangDay(MaSoGiangVien, MaLopHocPhan)
            if (!checkPhanCongGiangDay) {
                console.log("Không có thông tin để xoá.")
                return false;
            }
            
            await phanconggiangdayRepositories.DeleteOnePhanCongGiangDay(MaSoGiangVien, MaLopHocPhan)
            return "Đã xoá thông tin thành công."
            
        } catch (error: any) {
            throw new Error (`Lỗi Service/PhanCongGiangDay/DeleteOnePhanCongGiangDay: ${error}`);
        }
    }
}