import {Collection, MongoClient, Db} from "mongodb";
import path from "node:path";
import "dotenv/config";

let db: Db | null = null;                       // Biến dùng để lưu trữ mongodb khi kết nối thành công

export async function connectDatabase(){

    // Load các key trong .env
    const mongoUri = process.env.MONGO_URI as string;
    const mongoName = process.env.MONGO_NAME as string;

    if (!mongoUri || !mongoName) { throw new Error("Thiếu MONGO_URI hoặc MONGO_NAME trong file .env")}

    // Tạo ra biến dùng để kết nối với mongodb --> Nếu kết nối được thì chuyển nó lưu trữ vào biến toàn cục ở trên để sử dụng
    const client = new MongoClient(mongoUri);   // Kết nối với database
    await client.connect();
    db = client.db(mongoName);                  // Tạo bảng trong mongodb

    // Tạo ra các bảng trong mongodb
    await db.collection("SinhVien").createIndex({MasoSinhVien: 1}, {unique: true});
    await db.collection("GiangVien").createIndex({MaSoGiangVien: 1}, {unique: true});
    await db.collection("MonHoc").createIndex({MaMonHoc: 1}, {unique: true});
    await db.collection("LopHocPhan").createIndex({MaLopHocPhan: 1}, {unique: true});
    await db.collection("revoked_tokens").createIndex({token: 1}, {unique: true});

    console.log("[MONGODB] Connected DC = ", mongoName)
    return db;
}

// Kiểm tra xem mongodb được kết nối hây chưa 
export function getDb(): Db {
    if (!db) { throw new Error("Mongodb chưa kết nối. Kiểm tra file ConnectionDataBase.ts"); }
    return db;
}

// Hàm giúp gọi ra một Collection kết nối với các bảng của mongodb đã tạo 
// Hàm này lúc thực thi nó sẽ tự truyền đối tượng thật (sinh viêm, giảng viên, ...) vào object và trả 
// vềđối tượng kiểu Collection của mongodb
export function getCollection<T extends object>(name: string): Collection<T>{
    return getDb().collection<T>(name); // Gọi hàm db để lấy đối tượng database và gọi phương thức .collection<T>(name) của mongo
                                        //  để cho mọi kiểu dữ liệu đều được giống với T
}