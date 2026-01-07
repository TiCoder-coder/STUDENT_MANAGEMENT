import { DangKiHocPhan, DangKiHocPhanRepositories } from "../Repositories/DangKiHocPhan";
import { RequireAdmin, RequireSinhVienOrAdmin } from "../Middleware/PhanQuyen";
import { SinhVien, SinhVienRepositories } from "../Repositories/SinhVien";
import { LopHocPhan, LopHocPhanRepositories } from "../Repositories/LopHocPhan";
import { MonHocRepositories } from "../Repositories/MonHoc";
import { CreateDangKihocPhan } from "../Dtos/DangKiHocPhan/CreaateDangKiHocPhan";
import "dotenv/config"
import { TrangThaiDangKi } from "../Enums/Enums";

const SOTINCHIMAX = Number(process.env.SOTINCHIMAX);
const SOMONHOCMAX = Number(process.env.SOMONHOCMAX);

// Định nghĩa một class chứa các chức năng CRUD cho quá trình đăng kí học phần
export class DangKihocPhanServices{

    // Hàm dùng để đăng kí học phần cho sinh viên
    async createOneDangKiHocPhan(userRole: string, dangkihocphan: CreateDangKihocPhan){
        try {
            RequireSinhVienOrAdmin(userRole)// Chỉ có admin và sinh viên mới được sử dụng hàm này 

            // Kiểm tra mã số sinh viên có tồn tại không
            const sinhvienRepositories = new SinhVienRepositories();
            const checkSinhVien = await sinhvienRepositories.FindOneSinhVien(dangkihocphan.MasoSinhVien);
            if (!checkSinhVien) { throw new Error("Mã số sinh viên không tồn tại.") }

            // Kiểm tra lớp học phần mà sinh viên muốn đăng kí có tồn tại hay không 
            const lophocphanRepositories = new LopHocPhanRepositories();
            const checkLopHocPhan = await lophocphanRepositories.FindOneLopHocPhan(dangkihocphan.MaLopHocPhan);
            if (!checkLopHocPhan) { throw new Error("Lớp học phần không tồn tại."); }
            if (checkLopHocPhan.SoSinhVienHienTai + 1 > checkLopHocPhan.SoSinhVienToiDa ) {
                throw new Error("Lớp học phần đã đủ số lượng không thể đăng kí")
            }
            
            // Kiểm tra môn học mà sinh viên muốn đăng kí có tồn tại hay không
            const monhocReporitories = new MonHocRepositories()
            const checkMonHoc = await monhocReporitories.FindOneMonHoc(dangkihocphan.MaMonHoc)
            if (!checkMonHoc) {throw new Error("Mã môn không tồn tại."); }

            // Kiểm tra lớp học có đúng môn hay không
            if (checkLopHocPhan.MaMonHoc !== dangkihocphan.MaMonHoc) {
                throw new Error("Lớp học phần không thuộc môn học này.")}
            

            // Kiểm tra sinhh viên đã đăng kí môn học này hay chưa, nếu có ròi thì không đưọc đăng kí thêm một lớp khác
            const dangkihocphanRepositories = new DangKiHocPhanRepositories();
            if (await dangkihocphanRepositories.FindOneMonHocByMasoSinhVien(dangkihocphan.MasoSinhVien, dangkihocphan.MaMonHoc)){
                throw new Error("Môn học này sinh viên đã đăng kí không thể đăng kí lại.")
            }

            // // Lấy thông tin của tất cả các môn học mà sinh viên đã đăng kí để kiểm tra sinh viên đó có đăng kí vượt số tín chỉ cho phép hay chưa
            // const all = await dangkihocphanRepositories.FindAll({MasoSinhVien: dangkihocphan.MasoSinhVien});
            // const tongSoTinChi = all.reduce((s, x: any) => s + (x.SoTinChi ?? 0), 0); // Số tín chỉ là tổng số tín chỉ của các môn gộp lại

            // // Số tín chỉ đăng kí không được vượt quá 40
            // if (tongSoTinChi + checkMonHoc.SoTinChi > 40) {
            //     throw new Error("Vượt quá số tín chỉ và môn học cho phép.");
            // }
            
            const {soMon, tongSoTinChi} = await dangkihocphanRepositories.GetTongTinChiVaSoMon(dangkihocphan.MasoSinhVien);
            
            const soTinChiCuaMonHocHienTai = Number(checkMonHoc?.SoTinChi);

            if (tongSoTinChi + soTinChiCuaMonHocHienTai > SOTINCHIMAX || soMon + 1 > SOMONHOCMAX) {
                throw new Error("Đã đăng kí quá số môn và số tín chỉ cho phép.");
            }

            const datadangkihocphan = {
                MasoSinhVien: dangkihocphan.MasoSinhVien,
                MaMonHoc: dangkihocphan.MaMonHoc,
                MaLopHocPhan: dangkihocphan.MaLopHocPhan,
                SoTinChiDaDangKi: tongSoTinChi + soTinChiCuaMonHocHienTai,
                SoMonDaDangKi: soMon + 1,
                TrangThaiDangKi: TrangThaiDangKi.DaDangKi,
            }
            // Sau khi kiểm tra thông tin ok hết ròi thì tiến hành insert nó xuống database
            await dangkihocphanRepositories.CreateOneDangKiHocPhan(datadangkihocphan);
            await lophocphanRepositories.UpdateOneLopHocPhan(datadangkihocphan.MaLopHocPhan, {SoSinhVienHienTai: checkLopHocPhan.SoSinhVienHienTai + 1})
            
            // Trả về thông tin để người dùng biết đăng kí môn học đã thành công
            console.log("Đăng kí học phần thành công.")
            return {
                MasoSinhVien: dangkihocphan.MasoSinhVien,
                MaMonHoc: dangkihocphan.MaMonHoc,
                MaLopHocPhan: dangkihocphan.MaLopHocPhan,
                SoTinChiDaDangKi: tongSoTinChi + soTinChiCuaMonHocHienTai,
                SoMonDaDangKi: soMon + 1,
                TrangThaiDangKi: dangkihocphan.TrangThaiDangKi,
            }
        
        }catch (error: any) {
            throw new Error (`Lỗi Service/DangKiHocPhan/createDangKiHocPhan: ${error}`);
    }}

    // Hàm dùng để tìm kiếm một lớp học phần theo mã số sinh viên và mã môn học
    async TimKiemLopHocPhanTheoMSSVvaMHH(MasoSinhVien: string, MaMonHoc: string): Promise <any> {
        try {
            const dangkihocphanRepostitories = new DangKiHocPhanRepositories();
            const checklophocphan = await dangkihocphanRepostitories.FindOneMonHocByMasoSinhVien(MasoSinhVien, MaMonHoc);
            if (!checklophocphan) {
                throw new Error (`Sinh viên chưa đăng kí môn ${MaMonHoc} nên chưa có lớp hoc phần.`)
            }
            return {
                MasoSinhVien: checklophocphan.MasoSinhVien,
                MaMonHoc: checklophocphan.MaMonHoc,
                MaLopHocPhan: checklophocphan.MaLopHocPhan,
                TrangThaiDangKi: checklophocphan.TrangThaiDangKi,
            }
        } catch (error: any) {
            throw new Error (`Lỗi Service/DangKiHocPhan/TimKiemLopHocPhanTheoMSSVvaMHH: ${error}`);
        }
    }

    // Hàm dùng để cập nhập thông tin sau khi đăng kí học phần (đổi lớp, ...)
    async DoiLopHocPhan(userRole: string, MasoSinhVien: string, MaMonHoc: string, MaLopHocPhan: string){

        try {

            RequireSinhVienOrAdmin(userRole)    // Chỉ có chính sinh viên đó hoặc admin mới được thay đổi

            // Kiểm tra mã số sinh viên muốn đổi đăng kí có phải của sinh viên trong trường hay không
            const sinhvienRepositories = new SinhVienRepositories();
            const checkSinhVien = await sinhvienRepositories.FindOneSinhVien(MasoSinhVien);
            if (!checkSinhVien) { throw new Error("Mã số sinh viên không tồn tại.") }

            // Kiểm tra môn học mà sinh viên muốn thay đổi có không
            const monhocReporitories = new MonHocRepositories()
            const checkMonHoc = await monhocReporitories.FindOneMonHoc(MaMonHoc)
            if (!checkMonHoc) {throw new Error("Mã môn không tồn tại."); }
            
            // Kiểm tra lớp học phàn muốn thay đổi có tồn tại hoặc có còn dư để chuyển vào không
            const lophocphanRepositories = new LopHocPhanRepositories();
            const checkLopHocPhan = await lophocphanRepositories.FindOneLopHocPhan(MaLopHocPhan);
            if (!checkLopHocPhan) { throw new Error("Lớp học phần không tồn tại."); }
            if (checkLopHocPhan.SoSinhVienHienTai + 1 > checkLopHocPhan.SoSinhVienToiDa ) {
                throw new Error("Lớp học phần đã đủ số lượng không thể đăng kí")
            }

            // Kiểm tra lớp học có đúng môn hay không
            if (checkLopHocPhan.MaMonHoc !== MaMonHoc) {
                throw new Error("Lớp học phần không thuộc môn học này.")
            }

            // Kiểm tra xem sinh viên có đăng kí môn này trước đó chuwa (nếu có thì mới thay đổi được)
            const dangkihocphanRepositories = new DangKiHocPhanRepositories();
            const dangKiCu = await dangkihocphanRepositories.FindOne({MasoSinhVien, MaMonHoc});
            if (!dangKiCu) {throw new Error ("Sinh viên chưa đăng kí môn học này. Không thể đổi.")}
            
            // Sau khi đã kiểm tra ok hết thì tiến hành cập nhập thông tin
            await dangkihocphanRepositories.UpdateOneDangKiHocPhan(MasoSinhVien, MaMonHoc, MaLopHocPhan)

            // Cập nhập sĩ số cho lớp cũ và lớp mới: lớp cũ -1, lớp mới +1
            const LopCu = await lophocphanRepositories.FindOneLopHocPhan(dangKiCu.MaLopHocPhan);
            if (LopCu) {
                await lophocphanRepositories.UpdateOneLopHocPhan(LopCu.MaLopHocPhan, {SoSinhVienHienTai: Math.max(0, LopCu.SoSinhVienHienTai - 1)});
            }
            await lophocphanRepositories.UpdateOneLopHocPhan(MaLopHocPhan, {SoSinhVienHienTai: checkLopHocPhan.SoSinhVienHienTai + 1});

            return {
                MaSoSinhVien: MasoSinhVien,
                MaMonHoc: MaMonHoc,
                MaLopHocPhan: MaLopHocPhan
            }
            
        } catch (error: any) {
            throw new Error (`Lỗi Service/DangKiHocPhan/DoiLopHocPhan: ${error}`);
        }
    }

    // Hàm dùng để huỷ đăng kí môn học phần
    async HuyDangKiMotMonHoc(userRole: string, MasoSinhVien: string, MaMonHoc: string) {
        try {

            RequireSinhVienOrAdmin(userRole);   // Chỉ có chính sinh viên đó hoặc admin mới được thuỷ đăng kí

            // Kiểm tra môn này có đăng kí trước đó hay chưa (nếu có thì mới đăng kí được)
            const dangkihocphanRepositories = new DangKiHocPhanRepositories();
            const dangki = await dangkihocphanRepositories.FindOne({MasoSinhVien, MaMonHoc});
            if (!dangki){
                throw new Error ("Không thể huỷ vì chưa đăng kí môn này.")
            }

            // Xoá đăng kí học phần
            await dangkihocphanRepositories.DeleteOneDangKiHocPhan(MasoSinhVien, MaMonHoc);

            // Cập nhập lại số lượng sinh viên (-1) của lớp vừa mới huỷ
            const lopHocPhanRepositories = new LopHocPhanRepositories();
            const lophocphan = await lopHocPhanRepositories.FindOneLopHocPhan(dangki.MaLopHocPhan);
            if (lophocphan) {
                await lopHocPhanRepositories.UpdateOneLopHocPhan(lophocphan.MaLopHocPhan, {SoSinhVienHienTai: Math.max(0, lophocphan.SoSinhVienHienTai - 1)});
            }

            return "Đã huỷ đăng kí học phần thành công"
            
        } catch (error: any) {
            throw new Error (`Lỗi Service/DangKiHocPhan/HuyDangKiMotMonHoc: ${error}`);
        }
    }
}