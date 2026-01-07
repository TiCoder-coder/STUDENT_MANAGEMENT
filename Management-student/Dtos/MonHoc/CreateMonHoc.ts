import {IsString, IsNumber, IsEnum, IsNotEmpty, Length, Min, IsInt} from "class-validator";
import {Type} from "class-transformer";
import { MonHocBatBuoc, HinhThucHoc} from "../../Enums/Enums";

// Tạo ra một class chứa thông tin dùng để insert thông tin của môn học xuống database
export class CreateMonHoc{

    // Mã môn học --- khoá chính của table
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    MaMonHoc: string;                                                           // PRIMARY KEY

    // Tên của môn học
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    TenMonHoc: string;

    // Enum cho biết môn học có phải là môn bắt buộc hay không
    @IsString()
    @IsNotEmpty()
    @IsEnum(MonHocBatBuoc)
    BatBuoc: MonHocBatBuoc = MonHocBatBuoc.Co;
    
    // Sô tín chỉ của môn học
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @IsNotEmpty()
    SoTinChi: number;
    
    // Học phí của môn học
    @IsNumber()
    @IsNotEmpty()
    HocPhiMonHoc: number;

    // Hình thức học tập của môn học
    @IsString()
    @IsNotEmpty()
    @IsEnum(HinhThucHoc)
    HinhThucHoc: HinhThucHoc;

    // Mã lớp học phần --- liên kết với các lớp học phần để phân chia
    // @IsString()
    // @IsNotEmpty()
    // @Length(3, 100)
    // MaLopHocPhan: string;                                                       // FORIEGN KEY

}