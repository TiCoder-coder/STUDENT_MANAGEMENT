import {IsString, IsNumber, IsEnum, IsNotEmpty, Length} from "class-validator";

// Tạo ra một class chứa thông tin cho việc phân công giảng dạy ở trưởng 
export class CreatePhanCongGiangDay{

    // Mã số giảng viên (cho biết giáo viên nào sẽ dạy lớp học phần đó )
    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    MaSoGiangVien: string;                                           // FORIEGN KEY

    // Mã lớp học phần (cho biết giáo viên đó sẽ dạy lớp nào và môn nào)
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    MaLopHocPhan: string;                                           // FORIEGN KEY

}
