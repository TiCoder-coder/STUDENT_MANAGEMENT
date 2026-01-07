import { getCollection } from "../ConnectDatabase/ConnectDatabase";
import { TrangThaiDangKi } from "../Enums/Enums";
import { BaseConnection } from "./BaseConnection";


export interface DangKiHocPhan{

    MasoSinhVien: string;
    MaLopHocPhan: string;
    MaMonHoc: string;

    TrangThaiDangKi ?: TrangThaiDangKi;

}

export class DangKiHocPhanRepositories extends BaseConnection<DangKiHocPhan> {

    constructor() { super(getCollection<DangKiHocPhan>("DangKiHocPhan")); }

    // Hàm dùng để đăng kí học phần 
    CreateOneDangKiHocPhan(dangkihocphan: DangKiHocPhan){ return this.CreateOne(dangkihocphan); }

    // Hàm dùng để tìm kiếm thông tin đăng kí học phần bằng mã số sinh viên
    async FindOneMonHocByMasoSinhVien(MasoSinhVien: string, MaMonHoc: string){
        const sinhvien = await this.FindOne({MasoSinhVien, MaMonHoc});
        return sinhvien;
    }

    // Hàm dùng để lấy số tín chỉ và số môn để tính toán
    async GetTongTinChiVaSoMon(MasoSinhVien: string) {
        const dangkihocphan = getCollection<DangKiHocPhan>("DangKiHocPhan");
        const check = await dangkihocphan.find({MasoSinhVien, TrangThaiDangKi: TrangThaiDangKi.DaDangKi})
        .project({SoTinChiDaDangKi: 1}).toArray();

        const soMon = check.length;
        const tongSoTinChi = check.reduce((sum, x) => sum + (Number(x.SoTinChiDaDangKi ) || 0), 0);

        return {soMon, tongSoTinChi};
    }
    
    // Hàm dùng để cập nhập số tín chỉ trong quá trình đăng kí học phần
    UpdateSoTinChi(MasoSinhVien: string, SoTinChiSauKhiDangDangKiMon: number) { 
        return this.UpdateOne({MasoSinhVien}, {$set: {SoTinChiDaDangKi: SoTinChiSauKhiDangDangKiMon}})
    }
    
    // Hàm dùng để update thông tin đăng kí học phần
    UpdateOneDangKiHocPhan(MasoSinhVien: string, MaMonHoc: string, MaLopHocPhan: string){
        return this.UpdateOne({MasoSinhVien, MaMonHoc}, {$set: {MaLopHocPhan}});
    }
    
    // Hàm dùng để huỷ học phàn đã đăng kí
    DeleteOneDangKiHocPhan(MasoSinhVien: string, MaMonHoc: string) {return this.DeleteOne({MasoSinhVien, MaMonHoc}); }
    
}