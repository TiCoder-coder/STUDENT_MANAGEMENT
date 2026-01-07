import { CreateMaLopHocPhan } from "../Dtos/LopHocPhan/CreateLopHocPhan";
import { UpdateMaLopHocPhan } from "../Dtos/LopHocPhan/UpdateLopHocPhan";
import { TrangThaiLopHoc } from "../Enums/Enums";
import { RequireAdmin } from "../Middleware/PhanQuyen";
import { LopHocPhan, LopHocPhanRepositories } from "../Repositories/LopHocPhan";
import { MonHocRepositories } from "../Repositories/MonHoc";
import {ChuanHoaHoTen, KiemTraMatKhauManh, KiemTraDinhDangEmail, hashpassword, comparepassword} from "../Service/SinhVien"

export function KiemTraNgay(Ngay: number, Thang: number, Nam: number ) {

    const NgayHienTai = new Date();
    if (Nam < 0 || Nam < NgayHienTai.getFullYear()){
        throw new Error("Lỗi năm. Năm không được nhỏ hơn 0 và nhỏ hơn năm hiện tại. ");
    } else {
        if (Thang < 1 || Thang > 12) {
            throw new Error("Tháng phải nằm trong khoảng từ 1 đến 12.");
        } else {

            if (Thang == 1 || Thang == 3 || Thang == 5 || Thang == 7 || Thang == 8 || Thang == 10 || Thang == 12){
                if (Ngay < 1 || Ngay > 31){
                    throw new Error("Lỗi ngày sinh. Các tháng 1, 3, 5, 7, 8, 10, 12 phải có số ngày từ 1 đến 31.");
                }
                return true;
            }

            else if (Thang == 4 || Thang == 6 || Thang == 9 || Thang == 11){
                if (Ngay < 1 || Ngay > 30){
                    throw new Error("Lỗi ngày sinh. Các tháng 4, 6, 9, 11 phải có số ngày từ 1 đến 30.");
                }
                return true;
            }

            else {
                if (Nam % 4 == 0 && Nam % 100 !== 0){
                    if (Ngay < 1 || Ngay > 29){
                        throw new Error("Lỗi ngày sinh. Năm nhuận thì tháng 2 phải có ngày sinh từ 1 đến 29.");
                    }
                    return true;
                }

                else {
                    if (Ngay < 1 || Ngay > 28){
                        throw new Error("Lỗi ngày sinh. Năm không nhuận thì tháng 2 phải có ngày sinh từ 1 đến 28.");

                    }
                    return true;
                }
            }
        }
    }
}

// Tạo ra một hàm dùng để so sánh ngày (ngày kết thúc phải lớn hơn ngaỳ bắt đầu)
export function SoSanhNgay(ngaybatdau: Date, ngayketthuc: Date){
    
    // Kiểm tra định dạng ngày
    if (!KiemTraNgay(ngaybatdau.getDate(), ngaybatdau.getMonth() + 1, ngaybatdau.getFullYear())){ throw new Error("Ngày bắt đầu bị lỗi.")}
    if (!KiemTraNgay(ngayketthuc.getDate(), ngayketthuc.getMonth() + 1, ngayketthuc.getFullYear())){ throw new Error("Ngày kết thúc bị lỗi.")}

    // So sánh ngày (ngày bắt đầu không được lớn hơn ngày kết thúc)
    if (ngaybatdau.getFullYear() > ngayketthuc.getFullYear()){
        throw new Error("Ngày bắt đầu không được lớn hơn ngày kết thúc.")
    } else if (ngaybatdau.getMonth() > ngayketthuc.getMonth()){
        throw new Error("Ngày bắt đầu không được lớn hơn ngày kết thúc.")
    } else if (ngaybatdau.getDate() > ngayketthuc.getDate()){
        throw new Error("Ngày bắt đầu không được lớn hơn ngày kết thúc.")
    } else {
        return true;
    }
}

// Tạo ra một class dùng để tạo ra các chức năng CRUD cho lớp học phần
export class LopHocPhanServices{

    // Hàm dùng để insert thông tin của một lớp học phần xuống database
    async createOneLopHocPhan(userRole: string, lophocphan: CreateMaLopHocPhan){
        try {

            RequireAdmin(userRole)          // Chỉ có admin mới được quyền tạo ra các lớp học phần

            // Kiểm tra xem lớp học phần muốn tạo mới có tồn tại trước đó hay chưa
            const lophocphanRepositories = new LopHocPhanRepositories();
            const checkLopHocPhan = await lophocphanRepositories.FindOneLopHocPhan(lophocphan.MaLopHocPhan);
            if (checkLopHocPhan) { throw new Error("Lớp học phần đã tồn tại. Không được tạo mới."); }

            // Kiểm tra môn học mà muốn mở lớp học phần có tồn tại hay không
            const monhocRepositories = new MonHocRepositories()
            const checkMonHoc = await monhocRepositories.FindOneMonHoc(lophocphan.MaMonHoc);
            if (!checkMonHoc) {throw new Error("Không tồn tại mã lớp."); }
            
            // Kiểm tra định dạng ngày tháng năm
            SoSanhNgay(lophocphan.NgayBatDau, lophocphan.NgayKetThuc);

            // Kiểm ta số sinh viên (nếu không thêm gì vào thì nó sẽ mặc định ban đầu là 0)
            if (lophocphan.SoSinhVienHienTai === undefined) { lophocphan.SoSinhVienHienTai = 0}
            
            // Kiểm tra số sinh viên tối thiểu của lớp học phần đó
            if (lophocphan.SoSinhVienToiThieu < 0) {
                throw new Error("SoSinhVienToiThieu không được bé hơn 0.");
            }

            // Kiểm tra số sinh viên tối đa của lớp học phần đó
            if (lophocphan.SoSinhVienToiDa < 0 || lophocphan.SoSinhVienToiDa < lophocphan.SoSinhVienToiThieu) {
                throw new Error("SoSinhVienToiDa phải lớn hơn 0 và lớn hơn hoặc bằng số sinh viên tối thiểu.");
            }

            // Kiểm tra trạng thái cảu lớp học phần đó có thuộc enum hay không
            if (lophocphan.TrangThaiLopHoc !== TrangThaiLopHoc.DangHoatDong && lophocphan.TrangThaiLopHoc !== TrangThaiLopHoc.NgungHoatDong) {
                throw new Error("TrangThaiLopHoc phải là DangHoatDong hoặc NgungHoatDong.)");
            }

            // Tạo ra thông tin của lớp học phần
            await lophocphanRepositories.CreateOneLopHocPhan(lophocphan);

            // Trả về thông tin sau khi đã tạo
            return {
                MaLopHocPhan: lophocphan.MaLopHocPhan,
                MaMonHoc: lophocphan.MaMonHoc ,
                NgayBatDau: lophocphan.NgayBatDau ,
                NgayKetThuc: lophocphan.NgayKetThuc ,
                SoSinhVienHienTai: lophocphan.SoSinhVienHienTai,
                SoSinhVienToiThieu: lophocphan.SoSinhVienToiThieu ,
                SoSinhVienToiDa: lophocphan.SoSinhVienToiDa ,
                TrangThaiLopHoc: lophocphan.TrangThaiLopHoc
            }

        } catch (error: any) {
            throw new Error (`Lỗi Service/LopHocPhan/createOneLopHocPhan: ${error}`);
        }
    }

    // Hàm dùng để tìm kiếm thông tin của một lớp học phần
    async findOneLopHocPhan(MaLopHocPha: string){
        try {

            // Kiểm tra xem thông tin của lớp học phần muốn tìm kiếm có tồn tại hay không (nếu có thì in ra)
            const lophocphanRepositories = new LopHocPhanRepositories();
            const checkLopHocPhan = await lophocphanRepositories.FindOneLopHocPhan(MaLopHocPha);
            if (!checkLopHocPhan) { 
                throw new Error("Lớp học phần đã tồn tại. Không được tạo mới."); 
            } else {

                return {
                    MaLopHocPhan: checkLopHocPhan.MaLopHocPhan,
                    MaMonHoc: checkLopHocPhan.MaMonHoc ,
                    NgayBatDau: checkLopHocPhan.NgayBatDau ,
                    NgayKetThuc: checkLopHocPhan.NgayKetThuc ,
                    SoSinhVienHienTai: checkLopHocPhan.SoSinhVienHienTai,
                    SoSinhVienToiThieu: checkLopHocPhan.SoSinhVienToiThieu ,
                    SoSinhVienToiDa: checkLopHocPhan.SoSinhVienToiDa ,
                    TrangThaiLopHoc: checkLopHocPhan.TrangThaiLopHoc
                }       
            }

        } catch (error: any) {
            throw new Error (`Lỗi Service/LopHocPhan/findOneLopHocPhan: ${error}`);
        }
    }

    // Hàm dùng để liệt kê thông tin của tất cả các lớp học phần
    async findAllLopHocPhan(userRole: string){
        try {

            RequireAdmin(userRole)     // Chỉ có admin mơi đưọc tìm kiếm thông tin của tất cả các lớp học phần
            
            // Thực thi database để liệt kê
            const lophocphanRepositories = new LopHocPhanRepositories();
            const checkLopHocPhans = await lophocphanRepositories.FindAllLopHocPhan();

            // Nếu có thì liệt kê lần lượt thông tin của các lớp học phần
            if (checkLopHocPhans.length > 0){

                return checkLopHocPhans.map((checkLopHocPhan) => ({
                    MaLopHocPhan: checkLopHocPhan.MaLopHocPhan,
                    MaMonHocv: checkLopHocPhan.MaMonHoc,
                    NgayBatDau: checkLopHocPhan.NgayBatDau,
                    NgayKetThuc: checkLopHocPhan.NgayKetThuc,
                    SoSinhVienHienTai: checkLopHocPhan.SoSinhVienHienTai,
                    SoSinhVienToiThieu: checkLopHocPhan.SoSinhVienToiThieu,
                    SoSinhVienToiDa: checkLopHocPhan.SoSinhVienToiDa,
                    TrangThaiLopHoc: checkLopHocPhan.TrangThaiLopHoc
                }))

            } else {
                console.log("Không tìm thấy lớp học phần nào.");
                return;
            }

        } catch (error: any) {
            throw new Error (`Lỗi Service/LopHocPhan/findAllLopHocPhan: ${error}`);
        }
    }

    // Hàm dùng để cập nhập thông tin của một lớp học phần
    async UpdateOneMonHoc(UserRole: string, MaLopHocPhan: string, lophocphan: UpdateMaLopHocPhan){
        try{

            RequireAdmin(UserRole)          // Chỉ có admin mới đưọc cập nhập thông tin của lớp học phần
            
            // Tạo ra 2 biến dùng để lưu trữ
            const keys: (keyof LopHocPhan)[] = [];  // Lưu trữ các keys trong hệ thống
            const values: any[] = [];               // Lưu trữ values cho các keys trên

            // Kiểm tra xem lớp học phần muốn thay đổi có tồn tại hay không
            const lophocphanRepositories = new LopHocPhanRepositories();
            const checkLopHocPhan = await lophocphanRepositories.FindOneLopHocPhan(MaLopHocPhan);
            if (!checkLopHocPhan){
                throw new Error("Không tồn tại thông tin lớp học phần để update."); 
            } else {
                keys.push("MaLopHocPhan")
                values.push(lophocphan.MaLopHocPhan)
            }

            // Kiểm tra xem môn học muốn thay đổi có tồn tại thông tin hay không
            const monhocRepositories = new MonHocRepositories()
            const checkMonHoc = await monhocRepositories.FindOneMonHoc(lophocphan.MaMonHoc);
            if (!checkMonHoc) {
                throw new Error("Không tồn tại mã lớp."); 
            } else {
                keys.push("MaMonHoc")
                values.push(lophocphan.MaMonHoc)
            }
            
            // Kiểm tra định dạng ngày tháng năm
            if (lophocphan.NgayBatDau || lophocphan.NgayKetThuc) {

                // Kiểm tra ngày bắt đầu và ngaỳ kết thúc nếu muốn cập nhập
                SoSanhNgay(lophocphan.NgayBatDau, lophocphan.NgayKetThuc);

                if (lophocphan.NgayBatDau){
                    keys.push("NgayBatDau");
                    values.push(lophocphan.NgayBatDau)
                }

                if (lophocphan.NgayKetThuc){
                    keys.push("NgayKetThuc")
                    values.push(lophocphan.NgayKetThuc)
                }
            }

            // Kiểm tra số sinh viên tối đa và số sinh viên tối thiểu lúc muốn cập nhập
            if (lophocphan.SoSinhVienToiThieu || lophocphan.SoSinhVienToiDa) {
                if (lophocphan.SoSinhVienToiThieu < 0) {
                    throw new Error("SoSinhVienToiThieu không được bé hơn 0.");
                } else {
                    keys.push("SoSinhVienToiThieu")
                    values.push(lophocphan.SoSinhVienToiThieu)
                }
                if (lophocphan.SoSinhVienToiDa < 0 || lophocphan.SoSinhVienToiDa < lophocphan.SoSinhVienToiThieu) {
                    throw new Error("SoSinhVienToiDa phải lớn hơn 0 và lớn hơn hoặc bằng số sinh viên tối thiểu.");
                } else {
                    keys.push("SoSinhVienToiDa")
                    values.push(lophocphan.SoSinhVienToiDa)
                }
            }

            // Kiểm tra xem trạng thái môn học có thuộc trong enumm hay không
            if (lophocphan.TrangThaiLopHoc !== TrangThaiLopHoc.DangHoatDong && lophocphan.TrangThaiLopHoc !== TrangThaiLopHoc.NgungHoatDong) {
                throw new Error("TrangThaiLopHoc phải là DangHoatDong hoặc NgungHoatDong.)");
            } else {
                keys.push("TrangThaiLopHoc")
                values.push(lophocphan.TrangThaiLopHoc)
            }

            // Gắn các keys theo values tương ứng
            const ThongtinUpdate: Record<string, any> = {};
            for (let i = 0; i < keys.length; i++) {
                ThongtinUpdate[keys[i]] = values[i];
            }

            // Tiến hành cập nhập
            await lophocphanRepositories.UpdateOneLopHocPhan(MaLopHocPhan, ThongtinUpdate);
            return "Đã cập nhập thông tin môn học thành công.";

        } catch (error: any) {
            throw new Error (`Lỗi Service/LopHocPhan/UpdateOneMonHoc: ${error}`);
        }
    }

    // Hàm dùng để xoá thông tin của một lớp học phần
    async DeleteOneLopHocPhan(UserRole: string, MaLopHocPhan: string){
        try {

            RequireAdmin(UserRole);     // Chỉ có admin mới được xoá thông tin của lớp học phần đó 
            
            // Kiểm tra thông tin của lớp học phần đó có tồn tại không để xoá
            const lophocphanRepositories = new LopHocPhanRepositories();
            const checkLopHocPhan = await lophocphanRepositories.FindOneLopHocPhan(MaLopHocPhan);
            if (!checkLopHocPhan) { 
                throw new Error("Lớp học phần đã tồn tại. Không được tạo mới."); 
            } else {
                await lophocphanRepositories.DeleteOneHocPhan(MaLopHocPhan);
                return "Đã xoá lớp học phần thành công."
            }

        } catch (error: any) {
            throw new Error (`Lỗi Service/LopHocPhan/DeleteOneLopHocPhan: ${error}`);
        }

    }
}