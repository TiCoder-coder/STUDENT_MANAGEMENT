import { Collection, Filter, UpdateFilter, OptionalUnlessRequiredId } from "mongodb";

// Khởi tạo một hàm interface dùng đểtương tác với mongodb --- các class sau sẽ override lại thực hiện chức năng
export class BaseConnection<T extends Record<string, any>> {                                         // Khởi tạo một class có kiểu dữ liệu linh hoạt 
    constructor(protected readonly col: Collection<T>) {}                               //  Taọ ra một object dùng để call và các class con có thể sử dụng tuy nhiên không đươc sửa đổi

    // Khởi tạo một hàm dùng để tạo mới 
    CreateOne(doc: T){
        return this.col.insertOne(doc as OptionalUnlessRequiredId<T>);                  // Insert xuống database 
    }

    // Hàm dùng để tìm kiếm một đối tượng theo gì đó 
    async FindOne(filter: Filter<T>): Promise <T | null>{
        return (await this.col.findOne(filter)) as unknown as T | null;                 // Return về đúng đối tượng đó 
    }

    // Hàm dùng để tìm kiếm tất cả các đối tượng
    async FindAll(filter: Filter<T> = {} as any): Promise<T[]> {                        // Chỉ lấy limit là 50 để tránh tràn dữ liệu 
        return (await this.col.find(filter).toArray()) as unknown as T[];               // Return vềtất cả các đối tượng (nếu cần nhảy bao nhiêu thì nhảy, và giới 
    }

    // Hàm dùng để cập nhập thông tin của một đối tượng
    async UpdateOne(filter: Filter<T>, update: UpdateFilter<T>) {                       // Update filter chứa các hàm cập nhập ($set, $inc)
        
        return this.col.updateOne(filter, update);
    }

    // Hàm dùng để xoá một đối tượng
    async DeleteOne(filter: Filter<T>){
        return this.col.deleteOne(filter);                                              // Thực thi delete xuống database
    }

}