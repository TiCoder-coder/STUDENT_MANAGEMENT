import {IsString, IsNumber, IsEnum, IsNotEmpty, Length, IsOptional, Min, IsInt} from "class-validator";
import {Type} from "class-transformer";
import {TrangThaiLopHoc} from "../../Enums/Enums";

// Class dùng để chứa các thông tin để insert một lớp học phần xuống database
export class CreateMaLopHocPhan{

    // Mã lớp học phần --- khoá chính của table
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    MaLopHocPhan: string;                                               // PRIMARY KEY

    // Mã môn học --- liên kết với môn học (để đăng kí học phần và phân công giảng dạy)
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    MaMonHoc: string;

    // Ngày bắt đầu môn học
    @IsNotEmpty()
    @Type(() => Date)
    NgayBatDau: Date;

    // Ngày kết thúc môn học
    @IsNotEmpty()
    @Type(() => Date)
    NgayKetThuc: Date;

    // Sô sinh viên tối thiểu của lớp
    @Type(() => Number)
    @IsNotEmpty()
    @Min(0)
    @IsInt()
    SoSinhVienToiThieu: number;

    // Số sinh viên tối đa của lớp
    @Type(() => Number)
    @IsNotEmpty()
    SoSinhVienToiDa: number;

    // Số sinh viên hiện tại của lớp
    @Type(() => Number)
    @IsOptional()
    @Min(0)
    @IsInt()
    SoSinhVienHienTai: number

    // Trạng thái của lớp học
    @IsString()
    @IsNotEmpty()
    @IsEnum(TrangThaiLopHoc)
    TrangThaiLopHoc: TrangThaiLopHoc;

}