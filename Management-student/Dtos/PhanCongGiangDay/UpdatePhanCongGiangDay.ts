import {IsString, IsNumber, IsEnum, IsNotEmpty, Length, IsOptional} from "class-validator";

// Tạo ra một class chứa thông tin cho việc cập nhập thông tin phân công giảng dạy ở trưởng
export class UpdatePhanCongGiangDay{

    // Mã số giảng viên (cho biết giáo viên nào sẽ dạy lớp học phần đó )
    @IsString()
    @Length(3, 20)
    @IsOptional()
    MaSoGiangVien: string;                                           // FORIEGN KEY

    // Mã lớp học phần (cho biết giáo viên đó sẽ dạy lớp nào và môn nào)
    @IsString()
    @Length(3, 100)
    @IsOptional()
    MaLopHocPhan: string;                                           // FORIEGN KEY

}