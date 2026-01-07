import {IsString, IsNumber, IsEnum, IsNotEmpty, Length, IsOptional, Min, IsISIN} from "class-validator";
import {Type} from "class-transformer"
import {TrangThaiDangKi} from "../../Enums/Enums";

// Định nghĩ một class chứa các thông tin dùng để cập nhập thông tin đăng kí học phần
export class UpdateDangKihocPhan{

    // Mã số sinh viên
    @IsString()
    @Length(3, 100)
    @IsOptional()
    MasoSinhVien: string;                                           // FORIEGN KEY

    // Mã môn học --- liên kết với môn học
    @IsString()
    @IsOptional()
    MaMonHoc: string;

    // Mã lớp học phần --- liên kết với lớp học phần
    @IsString()
    @Length(3, 100)
    @IsOptional()
    MaLopHocPhan: string;                                             // FORIEGN KEY
    
    // Trạng thái đã đăng kí
    @IsString()
    @IsOptional()
    TrangThaiDangKi: TrangThaiDangKi = TrangThaiDangKi.DaDangKi;
    
}