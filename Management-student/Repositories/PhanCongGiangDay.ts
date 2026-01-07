import { getCollection } from "../ConnectDatabase/ConnectDatabase";
import { BaseConnection } from "./BaseConnection";

export interface PhanCongGiangDay{

    MaSoGiangVien: string; 
    MaLopHocPhan: string;

    createAt ?: Date;
    updateAt ?: Date;

}

export class PhanCongGiangDayRepositories extends BaseConnection<PhanCongGiangDay>{

    constructor() { super(getCollection<PhanCongGiangDay>("PhanCongGiangDay")); }

    // Hàm dùng để phân công giảng dạy
    CreateOnePhanCongGiangDay(phanconggiangday: PhanCongGiangDay){ return this.CreateOne(phanconggiangday); }

    // Hàm dùng để tìm kiếm thông tin giảng dạy của một lớp nào đó trong databse
    FindOnePhanCongGiangDay(MaSoGiangVien: string, MaLopHocPhan: string) { return this.FindOne({MaSoGiangVien, MaLopHocPhan}); }

    FindByMaLopHocPhan(MaLopHocPhan: string) { return this.FindOne({MaLopHocPhan}); }
    
    // Hàm dùng để liệt kê thông tin tất cả các lớp giảng dạy
    FindAllPhanCongGiangDay() {return this.FindAll(); }

    // Hàm dùng để cập nhập thông tin cho một lớp giảng dạy
    UpdateOnePhanCongGiangDay(MaLopHocPhan: string, update: Partial<PhanCongGiangDay>) { return this.UpdateOne({MaLopHocPhan}, {$set: update}); }

    // Hàm dùng để xoá thông tin của một lớp giảng dạy
    DeleteOnePhanCongGiangDay(MaSoGiangVien: string, MaLopHocPhan: string){ return this.DeleteOne({MaSoGiangVien, MaLopHocPhan})}
}