import {IsString, IsNumber, IsEnum, IsNotEmpty, Length, IsEmail, MinLength, IsDate, IsOptional} from "class-validator";
import {Type} from "class-transformer";
import { GioiTinh, TrangThaiHoatDong, TrangThaiHoatDongGiangVien, VaiTroNguoiDung } from "../../Enums/Enums";

// Class dùng để chứa các thông tin để insert một giáo viên xuống database
export class CreateGiangVien{

    // Mã số giảng viên --- khoá chính cho table
    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    MaSoGiangVien: string;                                              // PRIMARY KEY

    // Tên giảng viên
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    TenGiangVien: string;

    // Ngày sinh của giảng viên
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    NgaySinh: Date;

    // Nơi sinh của giảng viên
    @IsString()
    @IsNotEmpty()
    NoiSinh: string;

    // Giới tính của giảng viên
    @IsEnum(GioiTinh)
    @IsNotEmpty()
    GioiTinhGiangVien: GioiTinh;

    // Chuyên nghành của giảng viên
    @IsString()
    @IsNotEmpty()
    @Length(3, 300)
    ChuyenNghanh: string;

    // Trạng thái giảng dạy của giảng viên ở trường
    @IsEnum(TrangThaiHoatDongGiangVien)
    @IsNotEmpty()
    TrangThai: TrangThaiHoatDongGiangVien;

    // Vai trò của giảng viên
    @IsEnum(VaiTroNguoiDung)
    VaiTro: VaiTroNguoiDung = VaiTroNguoiDung.GiangVien;

    // Email của giảng viên
    @IsEmail()
    @IsNotEmpty()
    Email: string;
    
    // Username cho tên tài khoản của giảng viên
    @IsString()
    @Length(3, 100)
    @IsNotEmpty()
    UserName: string;

    // Password cho tài khoản của giảng viên
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    Password: string;

    // Số lần đăng nhập thất bại --- thuộc tính này sẽ tự cập nhập
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    SoLamDangNhapThatBai?: number = 0;
    
    // Không cho đăng nhập nếu đăng nhập sai quá nhiều --- thuộc tính này sẽ tự cập nhập
    @Type(() => Date)
    @IsOptional()
    KhongChoDangNhapToi?: Date | null = null;

}