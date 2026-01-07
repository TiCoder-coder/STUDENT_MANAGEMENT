import {IsString, IsNumber, IsEnum, IsNotEmpty, Length, IsOptional, Min, IsInt} from "class-validator";
import {Type} from "class-transformer";
import { MonHocBatBuoc, HinhThucHoc} from "../../Enums/Enums";

// Tạo ra một class chứa thông tin dùng để cập nhập thông tin của môn học xuống database
export class UpdateMonHoc{

    // Mã môn học --- khoá chính của table
    @IsString()
    @Length(3, 100)
    @IsOptional()
    MaMonHoc: string;                                                           // PRIMARY KEY

    // Tên của môn học
    @IsString()
    @Length(1, 100)
    @IsOptional()
    TenMonHoc: string;

    // Enum cho biết môn học có phải là môn bắt buộc hay không
    @IsString()
    @IsEnum(MonHocBatBuoc)
    @IsOptional()
    BatBuoc: MonHocBatBuoc = MonHocBatBuoc.Co;
    
    // Sô tín chỉ của môn học
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @IsOptional()
    SoTinChi: number;
    
    // Học phí của môn học
    @IsNumber()
    @IsOptional()
    HocPhiMonHoc: number;

    // Hình thức học tập của môn học
    @IsString()
    @IsEnum(HinhThucHoc)
    @IsOptional()
    HinhThucHoc: HinhThucHoc;

    // Mã lớp học phần --- liên kết với các lớp học phần để phân chia
    // @IsString()
    // @Length(3, 100)
    // @IsOptional()
    // MaLopHocPhan: string;                                                       // FORIEGN KEY

}