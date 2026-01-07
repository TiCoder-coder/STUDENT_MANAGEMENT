import { CreateSinhVien } from "../Dtos/SinhVien/CreateSinhVien";
import { UpdateSinhVien } from "../Dtos/SinhVien/UpdateSinhVien";
import { GioiTinh, TrangThaiHoatDong, VaiTroNguoiDung } from "../Enums/Enums";
import { RequireAdmin, RequireGiangVienOrAdmin } from "../Middleware/PhanQuyen";
import { SinhVien, SinhVienRepositories } from "../Repositories/SinhVien";
import bcrypt from "bcrypt";
import "dotenv/config"
import { TaoAcessToken, TaoRefreshToken, TokenPayload } from "../Middleware/XuLyToken";

const PASSWORD_PEPPER=process.env.PASSWORD_PEPPER as string;
const SOLANDANGNHAPTHATBAITOIDA = Number(process.env.SOLANDANGNHAPTHATBAITOIDA);
const TAIKHOANKHOATRONGKHOANG = Number(process.env.TAIKHOANKHOATRONGKHOANG);
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

// Hàm dùng để chuẩn hoá họ và tên
export function ChuanHoaHoTen(HoVaTen: string){
    
    if (!HoVaTen){throw new Error("Không có họ và tên để chuẩn hoá"); }

    const LoaiBoKhoangTrangDauCuoi = HoVaTen.trim();

    const ThayTheNhieuKhoangGiua = LoaiBoKhoangTrangDauCuoi.replace(/\s+/g, ' ');

    const chuyenThanhChuThuong = ThayTheNhieuKhoangGiua.toLowerCase();

    const TachChu = chuyenThanhChuThuong.split(' ');

    const HoVaTenHoanChinh = TachChu.map(Chu => {
        if (Chu.length === 0){ return; }
        return Chu.charAt(0).toUpperCase() + Chu.slice(1);
    });

    return HoVaTenHoanChinh.join(' ');

}

// Hmaf dùng để kiểm tra ngày sinh
export function KiemTraNgaySinh(Ngay: number, Thang: number, Nam: number ) {

    const NgayHienTai = new Date();
    if ((NgayHienTai.getFullYear()- Nam) < 17){
        throw new Error("Năm sinh không đạt tiêu chuẩn để học đại học. ");
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

// Kiểm tra mật khẩu có mạnh không
export function KiemTraMatKhauManh(password: string) {

    if (password.length <= 6 || password.length > 64){ throw new Error("Password phải có độ dài lớn hơn 6 và nhỏ hơn 64."); }
    
    const CosChuCaiThuong = /[a-z]/.test(password);
    const CoChuCaiInHoa = /[A-Z]/.test(password);
    const CoChuSo = /\d/.test(password);
    const CoKiTuDacBiet = /[^A-Za-z0-9]/.test(password);

    if (!CosChuCaiThuong) { throw new Error("Password phải có chữ cái thưởng. ")}
    if (!CoChuCaiInHoa) { throw new Error("Password phải có chữ cái hoa. "); }
    if (!CoChuSo) { throw new Error("Password phải có chữ số. "); }
    if (!CoKiTuDacBiet) { throw new Error("Password phải có kí tự đặc biệt. "); }

    return true;
 
}

// Hàm dùng để kiểm tra định dạng của email xem có đúng hay không
export function KiemTraDinhDangEmail(email: string){

    const e = email.trim().toLowerCase();
    if (e.includes("..")) { return false; }
    const re = /^[a-z0-9._%+-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i;
    return re.test(e);

}

// Hàm dùng để hashpassword
export async function hashpassword(Password: string){
    
    return bcrypt.hash(Password + PASSWORD_PEPPER, SALT_ROUNDS);

}

// Hàm dùng để giải mã password và so sánh
export function comparepassword(Password: string, hashed: string){

    return bcrypt.compare(Password + PASSWORD_PEPPER, hashed);
}

// Định nghĩa tầng service cho sinh viên: dùng để xử lí các nghiệp vụ logic
export class SinhVienServices{

    // Hàm dùng để insert thông tin của một sinh viên xuống database (nếu đúng )
    async createSinhVien(UserRole: string, sinhvien: CreateSinhVien) {
        try {

            RequireAdmin(UserRole);         // Phải là admin mới có quyền thêm thông tin sinh viên xuống database

            // Tạo một đối tượng repositories dùng để try cập database
            const sinhvienRepositories = new SinhVienRepositories();
            const checkSinhVien = await sinhvienRepositories.FindOneSinhVien(sinhvien.MasoSinhVien);
            
            // Kiểm tra mã số sinh viên xem có bị trùng không
            if (checkSinhVien){throw new Error("Mã số sinh viên bị trùng, vui lòng nhập mã số ính viên khác."); }

            // Kiểm tra trạng thái sinh viên có đúng trong enum hay không
            if (sinhvien.TrangThai !== TrangThaiHoatDong.DangHoc && sinhvien.TrangThai !== TrangThaiHoatDong.TamNgunghoc && sinhvien.TrangThai !== TrangThaiHoatDong.KhongConHoc){
                throw new Error("Trạng thái học tập của sinh viên phải là: DangHoc, TamNgungHoc, KhongConHoc");
            }

            // Kiểm tra giới tình học sinh có đúng trong enum hay không
            if(sinhvien.GioiTinhHocSinh !== GioiTinh.Nam && sinhvien.GioiTinhHocSinh !== GioiTinh.Nu && sinhvien.GioiTinhHocSinh !== GioiTinh.Khac){
                throw new Error("Giới tính của sinh viên phải là: Nam, Nu hoặc Khac");
            }

            // Kiểm tra vai trò có phải sinh viên hay không
            if (sinhvien.VaiTro !== VaiTroNguoiDung.SinhVien) {throw new Error ("Chức vụ không phù hợp."); }
            
            // Kiểm tra khóa học của sinh viên có đúng hay không 
            const NgayHienTai = new Date();
            if (sinhvien.KhoaHoc > NgayHienTai.getFullYear()){ throw new Error("Khoa hoc phải nhỏ hơn hoặc bằng năm hiện tại. "); }

            // Kiểm tra ngày tháng năm sinh có đúng hay không  
            KiemTraNgaySinh(sinhvien.NgaySinh.getDate(), sinhvien.NgaySinh.getMonth() + 1, sinhvien.NgaySinh.getFullYear());


            // Kiểm tra username có bị trùng hay không
            if (await sinhvienRepositories.FindOneSinhVienByUsername(sinhvien.UserName)){ throw new Error("Lỗi username. Username đã bị trùng.")}
            
            // Kiểm tra email có bị trùng hay không
            if (await sinhvienRepositories.FindOneSinhVienByEmail(sinhvien.Email)) {throw new Error("Lỗi email. Email đã bi trùng.")}
            
            // Kiểm tra email có đúng định dạng hay không
            if (!KiemTraDinhDangEmail(sinhvien.Email)){ throw new Error("Lỗi email. Email bị sai định dạng.");}

            // Kiểm tra mật khẩu có mạnh không
            KiemTraMatKhauManh(sinhvien.Password)

            // Chuẩn hoá họ và tên trước khi lưu xuống database
            sinhvien.HoVaTenSinhVien = ChuanHoaHoTen(sinhvien.HoVaTenSinhVien);
            sinhvien.NoiSinh = ChuanHoaHoTen(sinhvien.NoiSinh);
            sinhvien.ChuyenNghanh = ChuanHoaHoTen(sinhvien.ChuyenNghanh);
            sinhvien.Password = await hashpassword(sinhvien.Password)

            const newsinhvien: SinhVien = {
                ...sinhvien,
                SoLamDangNhapThatBai:0 ,
                KhongChoDangNhapToi:null as any,
            }

            // Inssert thông tin xuống database
            const insert = await sinhvienRepositories.CreateOneSinhVien(newsinhvien);

            if (insert){
                console.log("Đã cập nhập thông tin sinh viên xuống database thành công.")
                return {
                    MasoSinhVien: sinhvien.MasoSinhVien,
                    HoVaTenSinhVien: sinhvien.HoVaTenSinhVien,
                    GioiTinhHocSinh: sinhvien.GioiTinhHocSinh,
                    NgaySinh: sinhvien.NgaySinh,
                    NoiSinhv:sinhvien.NoiSinh,
                    KhoaHoc: sinhvien.KhoaHoc,
                    ChuyenNghanh: sinhvien.ChuyenNghanh,
                    UserName: "...................",
                    PassWord: "...................",
                    Email: sinhvien.Email,
                    TrangThai: sinhvien.TrangThai,
                    VaiTro: sinhvien.VaiTro,
                };
            } else{
                throw new Error("Không thể insert thông tin của sinhh viên xuống database.");
            }
        } catch (error: any) {
            throw new Error (`Lỗi Service/SinhVien/createSinhVien: ${error}`);
        }
    }

    // Hàm dùng để tìm kiếm thông tin của một sinh viên theo mã số 
    async TimKiemMotSinhVienTheoMaSo(MasoSinhVien: string){
        try {
            const sinhvienRepositories = new SinhVienRepositories();
            const checkSinhVien = await sinhvienRepositories.FindOneSinhVien(MasoSinhVien);

            if (!checkSinhVien) {
                throw new Error("Sinh viên không tồn tại")
            }
            console.log("Đã tìm thấy thông tin sinh viên: ")
            return {
                MasoSinhVien: checkSinhVien.MasoSinhVien,
                HoVaTenSinhVien: checkSinhVien.HoVaTenSinhVien,
                GioiTinhHocSinh: checkSinhVien.GioiTinhHocSinh,
                NgaySinh: checkSinhVien.NgaySinh,
                NoiSinhv:checkSinhVien.NoiSinh,
                KhoaHoc: checkSinhVien.KhoaHoc,
                ChuyenNghanh: checkSinhVien.ChuyenNghanh,
                UserName: "...................",
                Password: "...................",
                Email: checkSinhVien.Email,
                TrangThai: checkSinhVien.TrangThai,
                VaiTro: checkSinhVien.VaiTro
            };
        } catch (error: any) {
            throw new Error (`Lỗi Service/SinhVien/TimKiemMotSinhVienTheoMaSo: ${error}`);
        }
    }

    // Hàm dùng để liệt kê thông tin của tất cả các sinh viên
    async LietKeThongTinTatCaCacSinhVien(userRole: string){
        try{

            RequireGiangVienOrAdmin(userRole)
            const sinhvienRepositories = new SinhVienRepositories();
            const checkSinhViens = await sinhvienRepositories.FindAllSinhVien();

            if (checkSinhViens.length > 0){
                console.log("Thông tin của tất cả các sinh viên: ")
                return checkSinhViens.map((checkSinhVien) => ({
                    MasoSinhVien: checkSinhVien.MasoSinhVien,
                    HoVaTenSinhVien: checkSinhVien.HoVaTenSinhVien,
                    GioiTinhHocSinh: checkSinhVien.GioiTinhHocSinh,
                    NgaySinh: checkSinhVien.NgaySinh,
                    NoiSinhv:checkSinhVien.NoiSinh,
                    KhoaHoc: checkSinhVien.KhoaHoc,
                    ChuyenNghanh: checkSinhVien.ChuyenNghanh,
                    UserName: "...................",
                    Password: "...................",
                    Email: checkSinhVien.Email,
                    TrangThai: checkSinhVien.TrangThai,
                    VaiTro: checkSinhVien.VaiTro
                }));
            }
            console.log("Không có bất kì thông tin của sinh viên nào trong database.")
        } catch (error: any) {
            throw new Error (`Lỗi Service/SinhVien/LietKeThongTinTatCaCacSinhVien: ${error}`);
        }
    }

    // Hàm dùng cập nhập thông tin của một sinh viên
    async CapNhapThongTinMotSinhVien(userRole: string, MaSoSinhVien: string, sinhvien: UpdateSinhVien){
        try{

            RequireAdmin(userRole);         // Phải là admin mới có quyền thêm thông tin sinh viên xuống database
            const sinhvienRepositories = new SinhVienRepositories();
            const checkSinhVien = await sinhvienRepositories.FindOneSinhVien(MaSoSinhVien);

            // Tạo ra 2 biến dùng để lưu trữ
            const keys: (keyof SinhVien)[] = []                          // Lưu trữ key
            const values: any[] = [];                                    // Lưu trữ value

            // Kiểm tra có tồn tại sinh viên không để cập nhập
            if (!checkSinhVien) {
                throw new Error("Sinh viên không tồn tại")
            }

            if(sinhvien.MasoSinhVien){
                keys.push("MasoSinhVien")
                values.push(sinhvien.MasoSinhVien)
            }

            if(sinhvien.HoVaTenSinhVien){
                sinhvien.HoVaTenSinhVien = ChuanHoaHoTen(sinhvien.HoVaTenSinhVien)
                keys.push("HoVaTenSinhVien")
                values.push(sinhvien.HoVaTenSinhVien)
            }
            
            // Cập nhập thông tin ngày tháng năm sinh (nếu có)
            if (sinhvien.NgaySinh) {
                if (!KiemTraNgaySinh(sinhvien.NgaySinh.getDate(), sinhvien.NgaySinh.getMonth() + 1, sinhvien.NgaySinh.getFullYear())){
                    throw new Error ("Ngày sinh bị lỗi.");
                } else {
                    keys.push("NgaySinh")
                    values.push(sinhvien.NgaySinh)
                }
            }

            // Cập nhập thông tin Giới tính (nếu có)
            if (sinhvien.GioiTinhHocSinh){
                if(sinhvien.GioiTinhHocSinh !== GioiTinh.Nam && sinhvien.GioiTinhHocSinh !== GioiTinh.Nu && sinhvien.GioiTinhHocSinh !== GioiTinh.Khac){
                    throw new Error("Giới tính của sinh viên phải là: Nam, Nu hoặc Khac");
                } else {
                    keys.push("GioiTinhHocSinh")
                    values.push(sinhvien.GioiTinhHocSinh)
                }
            }

            if(sinhvien.NoiSinh){
                sinhvien.NoiSinh = ChuanHoaHoTen(sinhvien.NoiSinh)
                keys.push("NoiSinh")
                values.push(sinhvien.NoiSinh)
            }

            if(sinhvien.ChuyenNghanh){
                sinhvien.ChuyenNghanh = ChuanHoaHoTen(sinhvien.ChuyenNghanh)
                keys.push("ChuyenNghanh")
                values.push(sinhvien.ChuyenNghanh)
            }

            // Cập nhập thông tin khoá học (nếu có)
            const NgayHienTai = new Date();
            if (sinhvien.KhoaHoc){

                if (sinhvien.KhoaHoc > NgayHienTai.getFullYear()){ 
                    throw new Error("Khoa hoc phải nhỏ hơn hoặc bằng năm hiện tại. "); 
                } else {
                    keys.push("KhoaHoc")
                    values.push(sinhvien.KhoaHoc)
                }
            }
            
            // Cập nhập thông tin trạng thái (nếu có)
            if (sinhvien.TrangThai){

                if (sinhvien.TrangThai !== TrangThaiHoatDong.DangHoc && sinhvien.TrangThai !== TrangThaiHoatDong.TamNgunghoc && sinhvien.TrangThai !== TrangThaiHoatDong.KhongConHoc){
                    throw new Error("Trạng thái học tập của sinh viên phải là: DangHoc, TamNgungHoc, KhongConHoc");
                } else {
                    keys.push("TrangThai")
                    values.push(sinhvien.TrangThai)
                }
            }

            if (sinhvien.VaiTro){
                if (sinhvien.VaiTro !== VaiTroNguoiDung.SinhVien){
                    throw new Error("Chức vụ không phù hợp.");
                }
                keys.push("VaiTro")
                values.push(sinhvien.VaiTro)
            }

            // Cập nhập email (nếu có)
            if (sinhvien.Email){
                if (!sinhvienRepositories.FindOneSinhVienByEmail(sinhvien.UserName)) {throw new Error("Lỗi email. Email đã bi trùng.")}
            
                // Kiểm tra email có đúng định dạng hay không
                if (!KiemTraDinhDangEmail(sinhvien.Email)){ 
                    throw new Error("Lỗi email. Email bị sai định dạng.");
                } else{
                    keys.push("Email")
                    values.push(sinhvien.Email)
                }
            }


            // Cập nhập username (nếu có)
            if(sinhvien.UserName){
                if (!(await sinhvienRepositories.FindOneSinhVienByUsername(sinhvien.UserName))){ 
                    throw new Error("Lỗi username. Username đã bị trùng.");
                } else {
                    keys.push("UserName")
                    values.push(sinhvien.UserName)
                }
            }

            // Cập nhập mật khẩu (nếu có)
            if (sinhvien.Password) {
                if (KiemTraMatKhauManh(
                    sinhvien.Password)) { throw new Error("Mật khẩu yếu.");
                } else {
                    const hash = await hashpassword(sinhvien.Password);
                    keys.push("Password")
                    values.push(hash)
                }
            }

            if (sinhvien.SoLamDangNhapThatBai){
                keys.push("SoLamDangNhapThatBai")
                values.push(sinhvien.SoLamDangNhapThatBai)
            }

            if (sinhvien.KhongChoDangNhapToi){
                keys.push("KhongChoDangNhapToi")
                values.push(sinhvien.KhongChoDangNhapToi)
            }

            const ThongtinUpdate: Record<string, any> = {};
            for (let i = 0; i < keys.length; i++) {
                ThongtinUpdate[keys[i]] = values[i];
            }

            if (Object.keys(ThongtinUpdate).length === 0) {
                return "Không có thông tin nào mới để cập nhập."
            }

            await sinhvienRepositories.UpdateOneSinhVien(MaSoSinhVien, ThongtinUpdate);
            
            return "Đã cập nhập thông tin sinh viên thành công."
            
        } catch (error: any) {
            throw new Error (`Lỗi Service/SinhVien/CapNhapThongTinMotSinhVien: ${error}`);
        }
    }

    // Hàm dùng để xoá thông tin của một sinh viên
    async XoaThongTinMotSinhVien(userRole: string, MaSoSinhVien: string){
        try {

            RequireAdmin(userRole);         // Phải là admin mới có quyền thêm thông tin sinh viên xuống database
            
            const sinhvienRepositories = new SinhVienRepositories();
            const checkSinhVien = await sinhvienRepositories.FindOneSinhVien(MaSoSinhVien);
            if (!checkSinhVien) {
                throw new Error("Sinh viên không tồn tại")
            }
            
            await sinhvienRepositories.DeleteOneSinhVien(MaSoSinhVien);
            return "Đã xoá sinh viên thành công."
        } catch (error) {
            throw new Error (`Lỗi Service/SinhVien/XoaThongTinMotSinhVien: ${error}`);
        }
    }
    
    // Hàm dùng để khoá tài khoản khi sinh viên đăng nhập sai quá nhiều lần
    async KhoaTaiKhoan(UserName: string){
        try {

            const sinhvienRepositories = new SinhVienRepositories();
            const sinhvien = await sinhvienRepositories.FindOneSinhVienByUsername(UserName);
            if (!sinhvien) {throw new Error("Tài khoản không tồn tại"); }
            const SoLamDangNhapThatBai = sinhvien.SoLamDangNhapThatBai + 1;

            let KhoaToi: Date | undefined = undefined;
            
            if (SoLamDangNhapThatBai >= SOLANDANGNHAPTHATBAITOIDA){
                KhoaToi = new Date();
                KhoaToi.setMinutes(KhoaToi.getMinutes() + TAIKHOANKHOATRONGKHOANG);
            }

            await sinhvienRepositories.UpdateOneSinhVienByUsername( UserName, {
                SoLamDangNhapThatBai,
                KhongChoDangNhapToi: KhoaToi
            })

        } catch (error: any) {
            throw new Error (`Lỗi Service/SinhVien/KhoaTaiKhoan: ${error}`);
        }
            
    }

    // Hàm dùng cho sinh viên đăng nhập
    async DangNhap(UserName: string, Password: string): Promise<any>{
        try {
            
            const sinhvienRepositories = new SinhVienRepositories();
            const checkSinhVien = await sinhvienRepositories.FindOneSinhVienByUsername(UserName);
            if (!checkSinhVien){throw new Error("Tài khoản đăng nhập không tồn tại."); }

            const thoiGianHienTai = new Date()
            if (checkSinhVien.KhongChoDangNhapToi && thoiGianHienTai < new Date(checkSinhVien.KhongChoDangNhapToi)){
                throw new Error(`Tài khoản sinh viên bị khoá đến: ${checkSinhVien.KhongChoDangNhapToi}`)
            }
            
            const compare = await comparepassword(Password, checkSinhVien.Password);
            if (!compare) {
                console.error("Đăng nhập thất bại.");
                await this.KhoaTaiKhoan(UserName);
                throw new Error("Sai mật khẩu. Đăng nhập lại (tối đa được 3 lần).")
            }

            await sinhvienRepositories.UpdateOneSinhVienByUsername( UserName, {
                SoLamDangNhapThatBai: 0,
                KhongChoDangNhapToi: null as any
            });

            const claims: TokenPayload = {
                userId: checkSinhVien.MasoSinhVien,
                role: checkSinhVien.VaiTro,
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
            throw new Error (`Lỗi Service/SinhVien/DangNhap: ${error}`);
        }
    }
}