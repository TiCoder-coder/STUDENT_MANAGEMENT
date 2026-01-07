import {IsString, IsNumber, IsEnum, IsNotEmpty, Length, IsOptional, IsEmail, MinLength, IsDate} from "class-validator";
import {Type} from "class-transformer";
import { GioiTinh, TrangThaiHoatDong, TrangThaiHoatDongGiangVien, VaiTroNguoiDung } from "../../Enums/Enums";

// Class dùng để chứa các thông tin để cập nhập thông tin của một giáo viên xuống database

export class UpdateGiangVien{

    // Mã số giảng viên --- khoá chính cho table
    @IsString()
    @Length(3, 20)
    @IsOptional()
    MaSoGiangVien: string;                                              // PRIMARY KEY

    // Tên giảng viên
    @IsString()
    @Length(1, 100)
    @IsOptional()
    TenGiangVien: string;

    // Ngày sinh của giảng viên
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    NgaySinh: Date;

    // Nơi sinh của giảng viên
    @IsString()
    @IsOptional()
    NoiSinh: string;

    // Giới tính của giảng viên
    @IsString()
    @IsEnum(GioiTinh)
    @IsOptional()
    GioiTinhGiangVien: GioiTinh;

    // Chuyên nghành của giảng viên
    @IsString()
    @Length(3, 300)
    @IsOptional()
    ChuyenNghanh: string;

    // Trạng thái giảng dạy của giảng viên ở trường
    @IsString()
    @IsEnum(TrangThaiHoatDongGiangVien)
    @IsOptional()
    TrangThai: TrangThaiHoatDongGiangVien;

    // Vai trò của giảng viên
    @IsString()
    @IsEnum(VaiTroNguoiDung)
    @IsOptional()
    VaiTro: VaiTroNguoiDung = VaiTroNguoiDung.GiangVien;

    // Email của giảng viên
    @IsEmail()
    @IsOptional()
    Email: string;
    
    // Username cho tên tài khoản của giảng viên
    @IsString()
    @IsOptional()
    UserName: string;

    // Password cho tài khoản của giảng viên
    @IsString()
    @MinLength(8)
    @IsOptional()
    Password: string;

    // Số lần đăng nhập thất bại --- thuộc tính này sẽ tự cập nhập
    @IsNumber()
    @IsOptional()
    SoLamDangNhapThatBai?: number = 0;

    // Không cho đăng nhập nếu đăng nhập sai quá nhiều --- thuộc tính này sẽ tự cập nhập
    @Type(() => Date)
    @IsOptional()
    KhongChoDangNhapToi?: Date | null = null;

}