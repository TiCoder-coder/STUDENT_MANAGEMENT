import {IsString, IsNumber, IsEnum, IsNotEmpty, Length, IsDate, IsEmail, MinLength, IsOptional} from "class-validator";
import {Type} from "class-transformer";
import { GioiTinh, TrangThaiHoatDong, VaiTroNguoiDung } from "../../Enums/Enums";

// Clas chứa các thuộc tính để insert thông tin của một sinh viên xuống database
export class CreateSinhVien{

    // Mã số sinh viên
    @IsString()
    @Length(3, 100)
    @IsNotEmpty()
    MasoSinhVien: string;                                                       // PRIMARY KEY

    // Họ và tên của sinh viên
    @IsString()
    @Length(1, 300)
    @IsNotEmpty()
    HoVaTenSinhVien: string;

    // Ngày sinh của sinh viên
    @Type(() => Date)
    @IsNotEmpty()
    NgaySinh: Date;

    // Giới tính của sinh viên
    @IsEnum(GioiTinh)
    @IsNotEmpty()
    GioiTinhHocSinh: GioiTinh;

    // Nơi sinh của sinh viên
    @IsString()
    @Length(3, 300)
    @IsNotEmpty()
    NoiSinh: string;

    // Chuyên nghành của sinh viên
    @IsString()
    @IsNotEmpty()
    @Length(3, 300)
    ChuyenNghanh: string;

    // Khoá học của sinh viên thuộc năm bao nhiêu
    @IsNumber()
    @IsNotEmpty()
    KhoaHoc: number;

    // Trạng thái học tập của sinh viên
    @IsString()
    @IsNotEmpty()
    @IsEnum(TrangThaiHoatDong)
    TrangThai: TrangThaiHoatDong;

    // Vai trò của sinh viên
    @IsString()
    @IsOptional()
    @IsEnum(VaiTroNguoiDung)
    VaiTro: VaiTroNguoiDung = VaiTroNguoiDung.SinhVien;

    // Email của sinh viên
    @IsEmail()
    @IsNotEmpty()
    Email: string;
    
    // Username của sinh viên
    @IsString()
    @IsNotEmpty()
    UserName: string;

    // Password cho email của sinh viên
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    Password: string;

    // Số lần đăng nhập thất bại
    @Type(() => Number)
    @IsOptional()
    SoLamDangNhapThatBai?: number = 0;

    //Nếu sai quá số lần quy định thì sẽ khóa tài khoản sinh viên trong một khoảng thời gian
    @Type(() => Date)
    @IsOptional()
    KhongChoDangNhapToi?: Date | null = null;

}