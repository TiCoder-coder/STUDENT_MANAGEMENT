import {Collection, MongoClient, Db, ClientSession, ReadPreference} from "mongodb";
import "dotenv/config";

let db: Db | null = null;                       // Biến dùng để lưu trữ mongodb khi kết nối thành công
let client: MongoClient | null = null;          // Biến dùng để xem thử đã kết nối với databse hay chưa  (nếu có return luôn không cần kết nối lại)
let intialized = false;                         // Biến dùng để kiểm tra các table đã được tạo hay chưa, nếu chưa thì không cần tạo mới  (Create index chạy 1 lần)


export async function connectDatabase(){

    // Load các key trong .env
    const mongoUri = process.env.MONGO_URI as string;
    const mongoName = process.env.MONGO_NAME as string;

    if (!mongoUri || !mongoName) { throw new Error("Thiếu MONGO_URI hoặc MONGO_NAME trong file .env")}

    if (db && client) {return db;}

    // Tạo ra biến dùng để kết nối với mongodb --> Nếu kết nối được thì chuyển nó lưu trữ vào biến toàn cục ở trên để sử dụng
    client = new MongoClient(mongoUri);   // Kết nối với database
    await client.connect();
    db = client.db(mongoName);                  // Tạo bảng trong mongodb

    // Tạo ra các bảng trong mongodb
    if (!intialized) {
        await db.collection("SinhVien").createIndex({MasoSinhVien: 1}, {unique: true});
        await db.collection("GiangVien").createIndex({MaSoGiangVien: 1}, {unique: true});
        await db.collection("MonHoc").createIndex({MaMonHoc: 1}, {unique: true});
        await db.collection("LopHocPhan").createIndex({MaLopHocPhan: 1}, {unique: true});
        await db.collection("revoked_tokens").createIndex({token: 1}, {unique: true});
        intialized = true
    }

    console.log("[MONGODB] Connected DC = ", mongoName);
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

// Hàm kiểm tra xem client kết nối hay chưa để start session transaction
export function getClient(): MongoClient {
    if (!client) {
        throw new Error("MongoClient chưa connect.");
    }
    return client;
}
// Tạo ra một hàm dùng để transaction --- truyền các query vào callback và callback sẽ chạy trong transaction (nếu đúng thì trả về kết quả và đóng session)
export async function Transaction<T> (fn: (session: ClientSession) => Promise<T>): Promise<T> {
    const session = getClient().startSession();
    try {
        // Thử transaction
        return await session.withTransaction(async () => fn(session), {
            readPreference: ReadPreference.primary,                     // Đọc từ node primary
            readConcern: {level: "snapshot"},                           // Đảm bảo đọc nhất quán
            writeConcern: {w: "majority"},                              // Commit thành công khi đa số node được ghi nhận
        });

        // Commit sẽ tự động được sinh ra nếu fn(session ) không lỗi --- Nếu lỗi thì tự động rollback và throw error
    } finally {
        await session.endSession();                                                                     // Đóng session
    }
} 