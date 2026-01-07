import { getCollection } from "../ConnectDatabase/ConnectDatabase";
import { TrangThaiLopHoc } from "../Enums/Enums";
import { BaseConnection } from "./BaseConnection";

export interface LopHocPhan{

    MaLopHocPhan: string;
    MaMonHoc: string;
    NgayBatDau: Date;
    NgayKetThuc: Date;
    SoSinhVienToiThieu: number;
    SoSinhVienToiDa: number;
    SoSinhVienHienTai: number;
    TrangThaiLopHoc: TrangThaiLopHoc;

    createAt ?: Date;
    updateAt ?: Date;
}

export class LopHocPhanRepositories extends BaseConnection<LopHocPhan>{

    constructor() { super(getCollection<LopHocPhan>("LopHocPhan")); }

    // Hàm dùng để tạo ra một lớp học phần
    CreateOneLopHocPhan(lophocphan: LopHocPhan){ return this.CreateOne(lophocphan); }

    // Hàm dùng để tìm kiếm thông tin của một lớp học phần
    FindOneLopHocPhan(MaLopHocPhan: string) { return this.FindOne({MaLopHocPhan}); }

    // Hàm dùng đểliệt kê danh sách tất cả các lớp học phần
    FindAllLopHocPhan() { return this.FindAll(); }

    // Hàm dùng để cập nhập thông tin cho một lớp học phần
    UpdateOneLopHocPhan(MaLopHocPhan: string, update: Partial<LopHocPhan>) { return this.UpdateOne({MaLopHocPhan}, {$set: update}); }

    // Hàm dùng để cập nhập số sinh viên hiện tại (lúc đăng kí học phần)
    UpdateSoSinhVienHienTai(MaLopHocPhan: string, SoSinhVienHienTai: number){
        return this.UpdateOne({MaLopHocPhan}, {$set: {SoSinhVienHienTai}})
    }
    SoSinhVienHienTai(MaLopHocPhan: string, delta: number) {
        return this.UpdateOne({MaLopHocPhan}, {$inc: {SoSinhVienHienTai: delta} as any});
    }
    // Hàm dùng để xoá thông tin của một lớp học phần
    DeleteOneHocPhan(MaLopHocPhan: string) { return this.DeleteOne({MaLopHocPhan}); }
    
}