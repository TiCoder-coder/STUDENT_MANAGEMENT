import {IsString, IsNumber, IsEnum, IsNotEmpty, Length, IsInt, Min, IsISIN, IsOptional} from "class-validator";
import {Type} from "class-transformer"
import {TrangThaiDangKi} from "../../Enums/Enums";
import { Example } from "tsoa";


// Định nghĩ một class chứa các thông tin dùng để đăng kí học phần
export class CreateDangKihocPhan{

    // Mã số sinh viên
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    MasoSinhVien: string;                                           // FORIEGN KEY

    // Mã môn học --- liên kết với môn học
    @IsString()
    @IsNotEmpty()
    MaMonHoc: string;
    
    // Mã lớp học phần --- liên kết với lớp học phần
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    MaLopHocPhan: string;                                           // FORIEGN KEY

    // Trạng thái đã đăng kí
    @IsString()
    @IsOptional()
    TrangThaiDangKi: TrangThaiDangKi = TrangThaiDangKi.DaDangKi;
}