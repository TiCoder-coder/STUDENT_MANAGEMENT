import {IsString, IsNumber, IsEnum, IsNotEmpty, Length, IsOptional, Min, IsInt} from "class-validator";
import {Type} from "class-transformer";
import {TrangThaiLopHoc} from "../../Enums/Enums";

// Class dùng để chứa các thông tin để cập nhập thông tin của một lớp học phần xuống database
export class UpdateMaLopHocPhan{

    // Mã lớp học phần --- khoá chính của table
    @IsString()
    @Length(3, 100)
    @IsOptional()
    MaLopHocPhan: string;                                               // PRIMARY KEY

    // Mã môn học --- liên kết với môn học (để đăng kí học phần và phân công giảng dạy)
    @IsString()
    @Length(3, 100)
    @IsOptional()
    MaMonHoc: string;

    // Ngày bắt đầu môn học
    @IsOptional()
    @Type(() => Date)
    NgayBatDau: Date;

    // Ngày kết thúc môn học
    @IsOptional()
    @Type(() => Date)
    NgayKetThuc: Date;

    // Sô sinh viên tối thiểu của lớp
    @Type(() => Number)
    @Min(0)
    @IsOptional()
    SoSinhVienToiThieu: number;

    // Số sinh viên tối đa của lớp
    @Type(() => Number)
    @IsOptional()
    SoSinhVienToiDa: number;

    // Số sinh viên hiện tại của lớp
    @Type(() => Number)
    @IsOptional()
    @Min(0)
    @IsInt()
    SoSinhVienHienTai: number;

    // Trạng thái của lớp học
    @IsString()
    @IsEnum(TrangThaiLopHoc)
    @IsOptional()
    TrangThaiLopHoc: TrangThaiLopHoc;

}