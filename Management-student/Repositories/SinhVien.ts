import { BaseConnection } from "./BaseConnection";
import { GioiTinh, TrangThaiHoatDong, VaiTroNguoiDung } from "../Enums/Enums";
import { getCollection } from "../ConnectDatabase/ConnectDatabase";
import "dotenv/config"
import { ClientSession } from "mongodb";

const TAIKHOANKHOATRONGKHOANG = Number(process.env.TAIKHOANKHOATRONGKHOANG);

// Tạo ra một sinh viên
export interface SinhVien{

    // Thông tin của sinh viên như tầng Dtos
    MasoSinhVien: string;
    HoVaTenSinhVien: string;
    NgaySinh: Date;
    GioiTinhHocSinh: GioiTinh;
    NoiSinh: string;
    ChuyenNghanh: string;
    KhoaHoc: number;
    TrangThai: TrangThaiHoatDong;
    VaiTro: VaiTroNguoiDung;
    Email: string;
    UserName: string;
    Password: string;
    SoLamDangNhapThatBai: number;
    KhongChoDangNhapToi: Date;

    // Thêm 2 thuộc tính là ngày tạo và ngày cập nhập để lưu xuống database cho rõ ràng 
    createAt ?: Date;
    updateAt ?: Date;
    
}

export class SinhVienRepositories extends BaseConnection<SinhVien> {

    // Kết nối với bảng SinhVien của database
    constructor(){ super(getCollection<SinhVien>("SinhVien")); }

    // Hàm dùng để tạo ra một sinh Viên
    CreateOneSinhVien(sinhvien: SinhVien, session?:ClientSession){ return this.CreateOne(sinhvien, session ? {session}: undefined); }

    // Hàm dùng để tìm kiếm một sinh viên theo mã số sinh viên
    FindOneSinhVien(MasoSinhVien: string){ return this.FindOne({MasoSinhVien}); }

    // Hàm dùng để tìm kiếm tất  cả các sinh viên
    FindAllSinhVien(){ return this.FindAll(); }

    // Hàm dùng để tìm kiếm thông tin của sinh viên bằng username
    FindOneSinhVienByUsername(UserName: string){ return this.FindOne({UserName});}

    // Hàm dùng để tìm kiếm thông tin của sinh viên bằng username hoặc email
    FindOneSinhVienByEmail(Email: string) {return this.FindOne({Email});}

    // Hàm dùng để cập nhập thông tin của một sinh viên 
    UpdateOneSinhVien(MasoSinhVien: string, update: Partial<SinhVien>, session?:ClientSession){ 
        return this.UpdateOne({MasoSinhVien},{ $set: update}, session ? {session}: undefined); 
    }

    // Hàm dùng để cập nhập thông tin của sinh viên bằng username 
    UpdateOneSinhVienByUsername(UserName: string, update: Partial<SinhVien>, session?:ClientSession){
        return this.UpdateOne({UserName}, {$set: update}, session ? {session}: undefined);
    }

    // Hàm dùng để xoá thông tin của một sinh viên
    DeleteOneSinhVien(MasoSinhVien: string, session?:ClientSession) { return this.DeleteOne({MasoSinhVien}, session ? {session}: undefined); }

}