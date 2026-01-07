import {IsString, IsNumber, IsEnum, IsNotEmpty, Length, IsOptional, IsEmail, MinLength, IsDate} from "class-validator";
import {Type} from "class-transformer";
import { GioiTinh, TrangThaiHoatDong, VaiTroNguoiDung } from "../../Enums/Enums";

// Clas chứa các thuộc tính để cập nhập thông tin của một sinh viên xuống database
export class UpdateSinhVien{

    // Mã số sinh viên
    @IsString()
    @Length(3, 100)
    @IsOptional()
    MasoSinhVien: string;                                                       // PRIMARY KEY

    // Họ và tên của sinh viên
    @IsString()
    @Length(1, 300)
    @IsOptional()
    HoVaTenSinhVien: string;

    // Ngày sinh của sinh viên
    @Type(() => Date)
    @IsOptional()
    NgaySinh: Date;

    // Giới tính của sinh viên
    @IsEnum(GioiTinh)
    @IsOptional()
    GioiTinhHocSinh: GioiTinh;

    // Nơi sinh của sinh viên
    @IsString()
    @Length(3, 300)
    @IsOptional()
    NoiSinh: string;

    // Chuyên nghành của sinh viên
    @IsString()
    @IsOptional()
    @Length(3, 300)
    ChuyenNghanh: string;

    // Khoá học của sinh viên thuộc năm bao nhiêu
    @IsNumber()
    @IsOptional()
    KhoaHoc: number;

    // Trạng thái học tập của sinh viên
    @IsString()
    @IsOptional()
    @IsEnum(TrangThaiHoatDong)
    TrangThai: TrangThaiHoatDong;

    // Vai trò của sinh viên
    @IsString()
    @IsOptional()
    @IsEnum(VaiTroNguoiDung)
    VaiTro: VaiTroNguoiDung = VaiTroNguoiDung.SinhVien;

    // Email của sinh viên
    @IsEmail()
    @IsOptional()
    Email: string;
    
    // Username của sinh viên
    @IsString()
    @IsOptional()
    UserName: string;

    // Password cho email của sinh viên
    @IsString()
    @IsOptional()
    @MinLength(8)
    Password: string;

    // Số lần đăng nhập thất bại
    @Type(() => Number)
    @IsOptional()
    SoLamDangNhapThatBai: number;

    //Nếu sai quá số lần quy định thì sẽ khóa tài khoản sinh viên trong một khoảng thời gian
    @Type(() => Date)
    @IsOptional()
    KhongChoDangNhapToi: Date;

}