import { CreateGiangVien } from "../Dtos/GiangVien/CreateGiangVien";
import { UpdateGiangVien } from "../Dtos/GiangVien/UpdateGiangVien";
import { GioiTinh, TrangThaiHoatDongGiangVien } from "../Enums/Enums";
import { RequireAdmin, RequireGiangVienOrAdmin } from "../Middleware/PhanQuyen";
import { TaoAcessToken, TaoRefreshToken, TokenPayload } from "../Middleware/XuLyToken";
import { GiangVien, GiangVienRepositories } from "../Repositories/GiangVien";
import {ChuanHoaHoTen, KiemTraNgaySinh, KiemTraMatKhauManh, KiemTraDinhDangEmail, hashpassword, comparepassword} from "../Service/SinhVien"
import "dotenv/config"

const SOLANDANGNHAPTHATBAITOIDA = Number(process.env.SOLANDANGNHAPTHATBAITOIDA);
const TAIKHOANKHOATRONGKHOANG = Number(process.env.TAIKHOANKHOATRONGKHOANG);

// Định nghĩa tầng service cho giảng viên: dùng để xử lí các nghiệp vụ logic
export class GiangVienServices{

    // Hàm dùng để insert thông tin của một giảng viên xuống database (nếu đúng )
    async createGiangVien(UserRole: string, giangvien: CreateGiangVien){
        try {

            RequireAdmin(UserRole);         // Phải là admin mới có quyền thêm thông tin giảng viên xuống database

            // Tạo một đối tượng repositories dùng để try cập database
            const giangvienRepositories = new GiangVienRepositories();
            const checkGiangVien = await giangvienRepositories.findoneGiangVien(giangvien.MaSoGiangVien);
            
            // Kiểm tra mã số giảng viên xem có bị trùng không
            if (checkGiangVien){throw new Error("Mã số giảng viên bị trùng, vui lòng nhập mã số ính viên khác."); }

            // Kiểm tra trạng thái giảng viên có đúng trong enum hay không
            if (giangvien.TrangThai !== TrangThaiHoatDongGiangVien.DangDay && giangvien.TrangThai !== TrangThaiHoatDongGiangVien.TamNgungDay && giangvien.TrangThai !== TrangThaiHoatDongGiangVien.KhongConDay){
                throw new Error("Trạng thái học tập của giảng viên phải là: DangHoc, TamNgungHoc, KhongConHoc");
            }

            // Kiểm tra giới tình giảng sinh có đúng trong enum hay không
            if(giangvien.GioiTinhGiangVien !== GioiTinh.Nam && giangvien.GioiTinhGiangVien !== GioiTinh.Nu && giangvien.GioiTinhGiangVien !== GioiTinh.Khac){
                throw new Error("Giới tính của giảng viên phải là: Nam, Nu hoặc Khac");
            }
            
            // Kiểm tra ngày tháng năm sinh có đúng hay không  
            KiemTraNgaySinh(giangvien.NgaySinh.getDate(), giangvien.NgaySinh.getMonth() + 1, giangvien.NgaySinh.getFullYear());

            // Kiểm tra username có bị trùng hay không
            if (await giangvienRepositories.FindOneGiangVienByUsername(giangvien.UserName)){ throw new Error("Lỗi username. Username đã bị trùng.")}
            
            // Kiểm tra email có bị trùng hay không
            if (await giangvienRepositories.FindOneGiangVienByEmail(giangvien.UserName)) {throw new Error("Lỗi email. Email đã bi trùng.")}
            
            // Kiểm tra email có đúng định dạng hay không
            if (!KiemTraDinhDangEmail(giangvien.Email)){ throw new Error("Lỗi email. Email bị sai định dạng.");}

            // Kiểm tra mật khẩu có mạnh không
            KiemTraMatKhauManh(giangvien.Password)

            // Chuẩn hoá họ và tên trước khi lưu xuống database
            giangvien.TenGiangVien = ChuanHoaHoTen(giangvien.TenGiangVien);
            giangvien.NoiSinh = ChuanHoaHoTen(giangvien.NoiSinh);
            giangvien.ChuyenNghanh = ChuanHoaHoTen(giangvien.ChuyenNghanh);
            giangvien.Password = await hashpassword(giangvien.Password)

            const newgiangvien = {
                ...giangvien,
                SoLamDangNhapThatBai: 0,
                KhongChoDangNhapToi: null as any,
            }

            // Inssert thông tin xuống database
            const insert = await giangvienRepositories.createOneGiangVien(newgiangvien);

            if (insert){
                console.log("Đã cập nhập thông tin giảng viên xuống database thành công.")
                return {
                    MaSoGiangVien: giangvien.MaSoGiangVien,
                    TenGiangVien: giangvien.TenGiangVien,
                    GioiTinhGiangVien: giangvien.GioiTinhGiangVien,
                    NgaySinh: giangvien.NgaySinh,
                    NoiSinhv:giangvien.NoiSinh,
                    ChuyenNghanh: giangvien.ChuyenNghanh,
                    UserName: "......................",
                    Password: "......................",
                    Email: giangvien.Email,
                    TrangThai: giangvien.TrangThai,
                    VaiTro: giangvien.VaiTro
                };
            } else{
                throw new Error("Không thể insert thông tin của sinhh viên xuống database.");
            }
        } catch (error: any) {
            throw new Error (`Lỗi Service/GiangVien/createGiangVien: ${error}`);
        }
    }

    // Hàm dùng để tìm kiếm thông tin của một giảng viên theo mã số 
    async TimKiemMotGiangVienTheoMaSo(UserRole: string, MaSoGiangVien: string){
        try {
            RequireGiangVienOrAdmin(UserRole);          // Chỉ có giảng viên hoặc admin mới được thực hiện chức năng này
            
            // Kiểm tra xem giáo viên muốn tìm kiếm có tồn tại thông tin trong database hay không
            const giangvienRepositories = new GiangVienRepositories();
            const checkGiangVien = await giangvienRepositories.findoneGiangVien(MaSoGiangVien);
            
            // Trả về kết quả tìm kiếm
            if (!checkGiangVien) {
                throw new Error("Giảng viên không tồn tại")
            }
            console.log("Đã tìm thấy thông tin giảng viên: ")
            return {
                MaSoGiangVien: checkGiangVien.MaSoGiangVien,
                TenGiangVien: checkGiangVien.TenGiangVien,
                GioiTinhGiangVien: checkGiangVien.GioiTinhGiangVien,
                NgaySinh: checkGiangVien.NgaySinh,
                NoiSinhv:checkGiangVien.NoiSinh,
                ChuyenNghanh: checkGiangVien.ChuyenNghanh,
                UserName: "......................",
                Password: "......................",
                Email: checkGiangVien.Email,
                TrangThai: checkGiangVien.TrangThai,
                VaiTro: checkGiangVien.VaiTro
            };

        } catch (error: any) {
            throw new Error (`Lỗi Service/GiangVien/TimKiemMotGiangVienTheoMaSo: ${error}`);
        }
    }

    // Hàm dùng để liệt kê thông tin của tất cả các giảng viên
    async LietKeThongTinTatCaCacGiangVien(userRole: string){
        try{

            RequireAdmin(userRole)
            const giangvienRepositories = new GiangVienRepositories();
            const checkGiangViens = await giangvienRepositories.findAllGiangVien();

            if (checkGiangViens.length > 0){
                console.log("Thông tin của tất cả các giảng viên: ")
                return checkGiangViens.map((checkGiangVien) => ({
                    MaSoGiangVien: checkGiangVien.MaSoGiangVien,
                    TenGiangVien: checkGiangVien.TenGiangVien,
                    GioiTinhGiangVien: checkGiangVien.GioiTinhGiangVien,
                    NgaySinh: checkGiangVien.NgaySinh,
                    NoiSinhv:checkGiangVien.NoiSinh,
                    ChuyenNghanh: checkGiangVien.ChuyenNghanh,
                    UserName: "......................",
                    Password: "......................",
                    Email: checkGiangVien.Email,
                    TrangThai: checkGiangVien.TrangThai,
                    VaiTro: checkGiangVien.VaiTro
                }));
            }
            console.log("Không có bất kì thông tin của giảng viên nào trong database.")
        } catch (error: any) {
            throw new Error (`Lỗi Service/GiangVien/LietKeThongTinTatCaCacGiangVien: ${error}`);
        }
    }

    // Hàm dùng cập nhập thông tin của một giảng viên
    async CapNhapThongTinMotGiangVien(userRole: string, MaSoGiangVien: string, giangvien: UpdateGiangVien){
        try{
            RequireAdmin(userRole);         // Phải là admin mới có quyền thêm thông tin giảng viên xuống database
            const giangvienRepositories = new GiangVienRepositories();
            const checkGiangVien = await giangvienRepositories.findoneGiangVien(MaSoGiangVien);

            // Tạo ra 2 biến dùng để lưu trữ
            const keys: (keyof GiangVien)[] = []                          // Lưu trữ key
            const values: any[] = [];                                    // Lưu trữ value

            // Kiểm tra có tồn tại giảng viên không để cập nhập
            if (!checkGiangVien) {
                throw new Error("Giảng viên không tồn tại")
            }

            // Kiểm tra mã số giảng viên
            if(giangvien.MaSoGiangVien){
                keys.push("MaSoGiangVien")
                values.push(giangvien.MaSoGiangVien)
            }

            // Kiểm tra tên giảng viên
            if(giangvien.TenGiangVien){
                const hoten = ChuanHoaHoTen(giangvien.TenGiangVien)
                keys.push("TenGiangVien")
                values.push(hoten)
            }

            // Cập nhập thông tin ngày tháng năm sinh (nếu có)
            if (giangvien.NgaySinh) {
                if (!KiemTraNgaySinh(giangvien.NgaySinh.getDate(), giangvien.NgaySinh.getMonth() + 1, giangvien.NgaySinh.getFullYear())){
                    throw new Error ("Ngày sinh bị lỗi.");
                } else {
                    keys.push("NgaySinh")
                    values.push(giangvien.NgaySinh)
                }
            }

            // Cập nhập thông tin Giới tính (nếu có)
            if (giangvien.GioiTinhGiangVien){
                if(giangvien.GioiTinhGiangVien !== GioiTinh.Nam && giangvien.GioiTinhGiangVien !== GioiTinh.Nu && giangvien.GioiTinhGiangVien !== GioiTinh.Khac){
                    throw new Error("Giới tính của giảng viên phải là: Nam, Nu hoặc Khac");
                } else {
                    keys.push("GioiTinhGiangVien")
                    values.push(giangvien.GioiTinhGiangVien)
                }
            }

            // Kiểm tra nơi sinh
            if(giangvien.NoiSinh){
                giangvien.NoiSinh = ChuanHoaHoTen(giangvien.NoiSinh);
                keys.push("NoiSinh")
                values.push(giangvien.NoiSinh)
            }

            // Kiểm tra chuyên nghành
            if(giangvien.ChuyenNghanh){
                giangvien.ChuyenNghanh = ChuanHoaHoTen(giangvien.ChuyenNghanh);
                keys.push("ChuyenNghanh")
                values.push(giangvien.ChuyenNghanh)
            }

            // Cập nhập thông tin trạng thái (nếu có)
            if (giangvien.TrangThai){
                if (giangvien.TrangThai !== TrangThaiHoatDongGiangVien.DangDay && giangvien.TrangThai !== TrangThaiHoatDongGiangVien.TamNgungDay && giangvien.TrangThai !== TrangThaiHoatDongGiangVien.KhongConDay){
                    throw new Error("Trạng thái học tập của giảng viên phải là: DangHoc, TamNgungHoc, KhongConHoc");
                } else {
                    keys.push("TrangThai")
                    values.push(giangvien.TrangThai)
                }
            }

            // Kiểm tra vai trò
            if (giangvien.VaiTro){
                keys.push("VaiTro")
                values.push(giangvien.VaiTro)
            }

            // Cập nhập email (nếu có)
            if (giangvien.Email){

                if (!giangvienRepositories.FindOneGiangVienByEmail(giangvien.UserName)) {throw new Error("Lỗi email. Email đã bi trùng.")}
            
                // Kiểm tra email có đúng định dạng hay không
                if (!KiemTraDinhDangEmail(giangvien.Email)){ 
                    throw new Error("Lỗi email. Email bị sai định dạng.");
                } else{
                    keys.push("Email")
                    values.push(giangvien.Email)
                }
            }

            // Cập nhập username (nếu có)
            if(giangvien.UserName){
                if (!(await giangvienRepositories.findoneGiangVien(giangvien.UserName))){ 
                    throw new Error("Lỗi username. Username đã bị trùng.");
                } else {
                    keys.push("UserName")
                    values.push(giangvien.UserName)
                }
            }

            // Cập nhập mật khẩu (nếu có)
            if (giangvien.Password) {
                if (KiemTraMatKhauManh(
                    giangvien.Password)) { throw new Error("Mật khẩu yếu.");
                } else {
                    const hash = await hashpassword(giangvien.Password);
                    keys.push("Password")
                    values.push(hash)
                }
            }

            // Kiểm tra số lần đăng nhập thất bại
            if (giangvien.SoLamDangNhapThatBai){
                keys.push("SoLamDangNhapThatBai")
                values.push(giangvien.SoLamDangNhapThatBai)
            }

            // Kiểm tra không cho đăng nhập tới khi nào 
            if (giangvien.KhongChoDangNhapToi){
                keys.push("KhongChoDangNhapToi")
                values.push(giangvien.KhongChoDangNhapToi)
            }

            // Update thông tin
            const ThongtinUpdate: Record<string, any> = {};
            for (let i = 0; i < keys.length; i++) {
                ThongtinUpdate[keys[i]] = values[i];
            }
            if (Object.keys(ThongtinUpdate).length === 0) {
                return "Không có thông tin nào mới để cập nhập."
            }

            // Update
            await giangvienRepositories.updateoneGiangVien(MaSoGiangVien, ThongtinUpdate);
            return {
                message: "Đã cập nhập thông tin giảng viên thành công.",
                data: {
                    MaSoGiangVien: checkGiangVien.MaSoGiangVien,
                    TenGiangVien: checkGiangVien.TenGiangVien,
                    GioiTinhGiangVien: checkGiangVien.GioiTinhGiangVien,
                    NgaySinh: checkGiangVien.NgaySinh,
                    NoiSinhv:checkGiangVien.NoiSinh,
                    ChuyenNghanh: checkGiangVien.ChuyenNghanh,
                    UserName: "......................",
                    Password: "......................",
                    Email: checkGiangVien.Email,
                    TrangThai: checkGiangVien.TrangThai,
                    VaiTro: checkGiangVien.VaiTro
                }
            }
            
        } catch (error: any) {
            throw new Error (`Lỗi Service/GiangVien/CapNhapThongTinMotGiangVien: ${error}`);
        }
    }

    // Hàm dùng để xoá thông tin của một giảng viên
    async XoaThongTinMotGiangVien(userRole: string, MaSoGiangVien: string){
        try {
            RequireAdmin(userRole);         // Phải là admin mới có quyền thêm thông tin giảng viên xuống database
            const giangvienRepositories = new GiangVienRepositories();
            
            // Kiểm trâ xem giảng viên có tồn tại hay không để xoá thông tin
            const checkGiangVien = await giangvienRepositories.findoneGiangVien(MaSoGiangVien);
            if (checkGiangVien) {
                throw new Error("Giảng viên không tồn tại")
            }
            
            // Nếu có thì thực thi xoá thông tin
            await giangvienRepositories.deleteOneGiangVien(MaSoGiangVien);
            return "Đã xoá giảng viên thành công."

        } catch (error: any) {
            throw new Error (`Lỗi Service/GiangVien/XoaThongTinMotGiangVien: ${error}`);
        }
    }
    
    // Hàm dùng để khoá không cho giảng viên đăng nhập nữa -- khoá trong một khoảng thời gian (nếu đăng nhập sai quá nhiều)
    async KhoaTaiKhoan(UserName: string){
        try {

            // Kiểm tra xem giảng viên đó có tồn tại hay không
            const giangVienRepositories = new GiangVienRepositories();
            const giangvien = await giangVienRepositories.FindOneGiangVienByUsername(UserName);
            if (!giangvien) {throw new Error("Tài khoản không tồn tại"); }
            
            const SoLamDangNhapThatBai = giangvien.SoLamDangNhapThatBai + 1;    // Mỗi lần sai thì số lần thất bại sẽ cộng thêm 1

            let KhoaToi: Date | undefined = undefined;                          // Tạo một biến dùng để lưu trữ thời gian khoá
            
            // Nếu số lần sai vượt quá số lần quy định thì tiến hành khoá
            if (SoLamDangNhapThatBai >= SOLANDANGNHAPTHATBAITOIDA){
                KhoaToi = new Date();
                KhoaToi.setMinutes(KhoaToi.getMinutes() + TAIKHOANKHOATRONGKHOANG);
            }

            // Cập nhập thông tin xuống database
            await giangVienRepositories.updateOneGiangVienByUserName( UserName, {
                SoLamDangNhapThatBai,
                KhongChoDangNhapToi: KhoaToi
            })

        } catch (error: any) {
            throw new Error (`Lỗi Service/GiangVien/KhoaTaiKhoan: ${error}`);
        }
            
    }

    // Hàm dùng để cho giảng viên đăng nhập
    async DangNhap(UserName: string, Password: string): Promise<any>{
        try {

            // Kiểm tra xem username đang đăng nhập có tồn tại hay không
            const giangvienRepositories = new GiangVienRepositories();
            const checkGiangVien = await giangvienRepositories.FindOneGiangVienByUsername(UserName);
            if (!checkGiangVien){throw new Error("Tài khoản đăng nhập không tồn tại."); }

            // Kiểm tra xem tài khoản đó có đang bị khoá hay không
            const thoiGianHienTai = new Date()
            if (checkGiangVien.KhongChoDangNhapToi && thoiGianHienTai < new Date(checkGiangVien.KhongChoDangNhapToi)){
                throw new Error(`Tài khoản sinh viên bị khoá đến: ${checkGiangVien.KhongChoDangNhapToi}`)
            }

            // So sánh password nhập vào và password ở database xem có khớp không
            const compare = await comparepassword(Password, checkGiangVien.Password);
            if (!compare) {
                console.error("Đăng nhập thất bại.");
                await this.KhoaTaiKhoan(UserName);
                throw new Error("Sai mật khẩu. Đăng nhập lại (tối đa được 3 lần).")
            }

            // Nếu đăng nhập thành công thì cập nhập lại số lần thất bại là 0
            await giangvienRepositories.updateOneGiangVienByUserName( UserName, {
                SoLamDangNhapThatBai: 0,
                KhongChoDangNhapToi: null as any
            });
            
            const claims: TokenPayload = {
                userId: checkGiangVien.MaSoGiangVien,
                role: checkGiangVien.VaiTro,
            }

            const accesstoken = TaoAcessToken(claims);
            const resfreshtoken = TaoRefreshToken(claims);

            return {
                user: {
                    userId: claims.userId,
                    role: claims.role,
                },
                AccessToken: accesstoken,
                RefreshToken: resfreshtoken,

            }
                
        } catch (error: any) {
            throw new Error (`Lỗi Service/GiangVien/DangNhap: ${error}`);
        }
    }
}