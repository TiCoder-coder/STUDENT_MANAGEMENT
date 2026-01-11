import { HinhThucHoc, MonHocBatBuoc } from "../Enums/Enums";
import { BaseConnection } from "./BaseConnection";
import { getCollection } from "../ConnectDatabase/ConnectDatabase";
import { ClientSession } from "mongodb";

export interface MonHoc{

    MaMonHoc: string;
    TenMonHoc: string;
    BatBuoc: MonHocBatBuoc;
    SoTinChi: number;
    HinhThucHoc: HinhThucHoc;
    HocPhiMonHoc: number;
    // MaLopHocPhan: string;

    createAt ?: Date;
    updateAt ?: Date;
}

export class MonHocRepositories extends BaseConnection<MonHoc>{
    
    constructor() { super(getCollection<MonHoc>("MonHoc")); }

    // Hàm dùng để insert thông tin của một môn học xuống database
    CreateOneMonHoc(monhoc: MonHoc, session?:ClientSession){ return this.CreateOne(monhoc, session ? {session}: undefined); }

    // Hàm dùng để tìm kiếm thông tin của một môn học
    FindOneMonHoc(MaMonHoc: string) { return this.FindOne({MaMonHoc}); }

    // Hàm dùng để tìm kiếm thông tin của môn học bằng mã lớp học phần (mỗi lớp học phần chỉ có 1 môn học)
    // FindMonHocTheoMaHocPhan(MaLopHocPhan: string) { return this.FindOne({MaLopHocPhan}); }
    
    // Hàm dùng để liệt kê thông tin của tất cả các môn học
    FindAllMonHoc() { return this.FindAll(); }

    // Hàm dùng để cập nhập thông tin của một môn học 
    UpdateOneMonHoc(MaMonHoc: string, update: Partial<MonHoc>, session?:ClientSession){ return this.UpdateOne({MaMonHoc}, {$set: update}, session ? {session}: undefined); }

    // Hàm dùng để xoá thông tin của một môn học 
    DeleteOneMonHoc(MaMonHoc: string, session?:ClientSession) {return this.DeleteOne({MaMonHoc}, session ? {session}: undefined); }
    
}