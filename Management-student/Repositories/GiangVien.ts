import { BaseConnection } from "./BaseConnection";
import { getCollection } from "../ConnectDatabase/ConnectDatabase";
import { GioiTinh, TrangThaiHoatDong, TrangThaiHoatDongGiangVien, VaiTroNguoiDung } from "../Enums/Enums";

export interface GiangVien{

    MaSoGiangVien: string;
    TenGiangVien: string;
    NgaySinh: Date;
    NoiSinh: string;
    GioiTinhGiangVien: GioiTinh;
    ChuyenNghanh: string
    TrangThai: TrangThaiHoatDongGiangVien;
    VaiTro: VaiTroNguoiDung;
    Email: string;
    UserName: string;
    Password: string;
    SoLamDangNhapThatBai: number;
    KhongChoDangNhapToi: Date;

    createAt ?: Date;
    updateAt ?: Date;
    
}

export class GiangVienRepositories extends BaseConnection<GiangVien>{

    constructor(){ super(getCollection<GiangVien>("GiangVien")); }

    // Hàm dùng để thêm thông tin của một giảng viên vào database
    createOneGiangVien(giangvien: GiangVien){ return this.CreateOne(giangvien); }

    // Hàm dùng để tìm kiếm thông tin của một giàng viên
    findoneGiangVien(MaSoGiangVien: string){ return this.FindOne({MaSoGiangVien}); }

    // Hàm dùng để hiển thị thông tin của tát cả các giảng viên
    findAllGiangVien(){ return this.FindAll(); }

    // Hàm dùng để tìm kiếm thông tin của giảng viên bằng username
    FindOneGiangVienByUsername(UserName: string){ return this.FindOne({UserName});}

    // Hàm dùng để tìm kiếm thông tin của giảng viên bằng username hoặc email
    FindOneGiangVienByEmail(Email: string) {return this.FindOne({Email});}

    // Hàm dùng để cập nhập thông tin của một giảng viên
    updateoneGiangVien(MaSoGiangVien: string, update: Partial<GiangVien>){ return this.UpdateOne({MaSoGiangVien}, {$set: update}); }

    // Hàm dùng để cập nhập thông tin của giảng viên bằng username của giảng viên
    updateOneGiangVienByUserName(UserName: string, update: Partial<GiangVien>){
        return this.UpdateOne({UserName}, {$set: update})
    }
    // Hàm dùng để xoá thông tin của một giảng viên
    deleteOneGiangVien(MaSoGiangVien: string) {return this.DeleteOne({MaSoGiangVien}); }
}