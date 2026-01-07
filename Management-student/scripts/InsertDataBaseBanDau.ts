import "dotenv/config";
import { MongoClient } from "mongodb";
import { hashpassword } from "../Service/SinhVien";

const mongoUri = process.env.MONGO_URI as string;
const mongoName = process.env.MONGO_NAME as string;

// Thông tin admin
const ADMIN_NAME = process.env.ADMIN_NAME as string;
const MASOADMIN = process.env.MASOADMIN as string;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD as string;
const ADMINROLE = process.env.ADMINROLE as string;
const EMAIL = process.env.EMAIL as string;
const HOVATENADMIN = process.env.HOVATENADMIN as string;

// Thông tin giảng viên
const MASOGIANGVIEN = process.env.MASOGIANGVIEN as string;
const GIANGVIENNAME = process.env.GIANGVIENNAME as string;
const GIANGVIENPASSWORD = process.env.GIANGVIENPASSWORD as string;
const GIANGVIENROLE = process.env.GIANGVIENROLE as string;
const HOVATENGIANGVIEN = process.env.HOVATENGIANGVIEN as string;
const EMAILGIANGVIEN = process.env.EMAILGIANGVIEN as string;

// Thông tin sinh viên
const MSSV = process.env.MSSV as string;
const SINHVIENNAME = process.env.SINHVIENNAME as string;
const SINHVIENPASSWORD = process.env.SINHVIENPASSWORD as string;
const SINHVIIENROLE = process.env.SINHVIIENROLE as string;
const HOVATENSINHVIEN = process.env.HOVATENSINHVIEN as string;
const EMAILSINHVIEN = process.env.EMAILSINHVIEN as string;

async function InsertDataBaseBanDau() {
    const client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db(mongoName);

    await db.collection("GiangVien").updateOne(
        {UserName: ADMIN_NAME},
        {
            $setOnInsert: {
                MaSoGiangVien: MASOADMIN,
                HoVaTenGiangVien: HOVATENADMIN,
                Email: EMAIL,
                UserName: ADMIN_NAME,
                Password: await hashpassword(ADMIN_PASSWORD),
                VaiTro: ADMINROLE,
                SoLamDangNhapThatBai: 0,
                KhongChoDangNhapToi: null,
                createdAt: new Date(),
            },
        },
        {upsert: true}
    );

    await db.collection("GiangVien").updateOne(
        {UserName: GIANGVIENNAME},
        {
            $setOnInsert: {
                MaSoGiangVien: MASOGIANGVIEN,
                HoVaTenGiangVien: HOVATENGIANGVIEN,
                Email: EMAILGIANGVIEN,
                UserName: GIANGVIENNAME,
                Password: await hashpassword(GIANGVIENPASSWORD),
                VaiTro: GIANGVIENROLE,
                SoLamDangNhapThatBai: 0,
                KhongChoDangNhapToi: null,
                createdAt: new Date(),
            },
        },
        {upsert: true}
    );

    await db.collection("SinhVien").updateOne(
        {UserName: SINHVIENNAME},
        {
            $setOnInsert: {
                MaSoGiangVien: MSSV,
                HoVaTenGiangVien: HOVATENSINHVIEN,
                Email: EMAILSINHVIEN,
                UserName: SINHVIENNAME,
                Password: await hashpassword(SINHVIENPASSWORD),
                VaiTro: SINHVIIENROLE,
                SoLamDangNhapThatBai: 0,
                KhongChoDangNhapToi: null,
                createdAt: new Date(),
            },
        },
        {upsert: true}
    );

    console.log("Insert thành công.")
    await client.close();
}

InsertDataBaseBanDau().catch((e) => {
    console.log("Error: ", e);
    process.exit(1);
})