# 🎓 Management Student — Hệ thống Quản lý Sinh viên & Đăng ký Học phần (API)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![tsoa](https://img.shields.io/badge/tsoa-2B2B2B?logo=swagger&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)

> **Mục tiêu:** Xây dựng hệ thống API cho **quản lý sinh viên, môn học, lớp học phần** và **đăng ký học phần** theo đúng nghiệp vụ (giới hạn tín chỉ, giới hạn số môn, sĩ số lớp, phân quyền…).

📌 **Tác giả:** Võ Anh Nhật  
📅 **Last updated:** 2026-01-07

---

## 🧭 Mục lục
- [1. Tổng quan](#1-tổng-quan)
- [2. Các chức năng chính](#2-các-chức-năng-chính)
- [3. Luồng nghiệp vụ Đăng ký học phần](#3-luồng-nghiệp-vụ-đăng-ký-học-phần)
- [4. Mô hình dữ liệu (gợi ý)](#4-mô-hình-dữ-liệu-gợi-ý)
- [5. Kiến trúc & cấu trúc thư mục](#5-kiến-trúc--cấu-trúc-thư-mục)
- [6. Công nghệ sử dụng](#6-công-nghệ-sử-dụng)
- [7. Cài đặt & chạy dự án](#7-cài-đặt--chạy-dự-án)
- [8. Swagger / API Docs](#8-swagger--api-docs)
- [9. Ví dụ gọi API](#9-ví-dụ-gọi-api)
- [10. Quy tắc kiểm tra dữ liệu](#10-quy-tắc-kiểm-tra-dữ-liệu)
- [11. Troubleshooting](#11-troubleshooting)
- [12. Roadmap](#12-roadmap)

---

## 1. Tổng quan
Dự án này là một **backend API** phục vụ cho bài toán **quản lý đào tạo** (đăng ký học phần).

✨ Điểm nổi bật:
- 🧩 Tách lớp rõ ràng theo mô hình **Controller → Service → Dtos → Repository**
- 🔐 **JWT Access/Refresh Token** + **Phân quyền** (Admin / Sinh viên / Giảng viên)
- ✅ Validate dữ liệu vào bằng **class-validator** & **class-transformer**
- 📚 Sinh Swagger docs tự động bằng **tsoa** (OpenAPI)

---

## 2. Các chức năng chính
### 👤 Sinh viên (SinhVien)
- ➕ Tạo sinh viên (Admin)
- 🔎 Tìm sinh viên theo MSSV
- 📃 Liệt kê sinh viên (Giảng viên/Admin)
- ✏️ Cập nhật thông tin sinh viên (Admin)
- 🗑️ Xóa sinh viên (Admin)
- 🔐 Đăng nhập (JWT) + cơ chế **khóa tài khoản** khi nhập sai quá nhiều

### 👤 Giảng viên (GiangVien)
- ➕ Tạo giảng viên (Admin)
- 🔎 Tìm giảng viên theo MSSV
- 📃 Liệt kê giảng viên (Giảng viên/Admin)
- ✏️ Cập nhật thông tin giảng viên (Admin)
- 🗑️ Xóa giảng viên (Admin)
- 🔐 Đăng nhập (JWT) + cơ chế **khóa tài khoản** khi nhập sai quá nhiều

### 📚 Môn học (MonHoc)
- ➕ CRUD môn học
- 🔗 Liên kết với lớp học phần (một môn có thể có **nhiều** lớp học phần)

### 🏫 Lớp học phần (LopHocPhan)
- ➕ CRUD lớp học phần
- 👥 Quản lý sĩ số: `SoSinhVienHienTai`, `SoSinhVienToiDa`
- 🔎 Kiểm tra lớp có thuộc môn học hay không (ràng buộc nghiệp vụ)

### 🧾 Đăng ký học phần (DangKiHocPhan)
- ✅ Đăng ký học phần theo `MasoSinhVien + MaMonHoc + MaLopHocPhan`
- 🔁 Đổi lớp học phần cho cùng một môn
- ❌ Hủy đăng ký
- 🧮 **Tự động tính**:
  - `Tổng số tín chỉ đã đăng ký`
  - `Tổng số môn đã đăng ký`
  (lấy trực tiếp từ DB, không cho người dùng nhập)

### 🧑‍🏫 Phân công giảng dạy (PhanCongGiangDay)
- Gán giảng viên cho lớp học phần/môn học theo học kỳ

---

## 3. Luồng nghiệp vụ Đăng ký học phần
### ✅ 3.1. Đăng ký
Khi sinh viên đăng ký học phần, hệ thống sẽ kiểm tra theo thứ tự:

1) 🧑‍🎓 **Sinh viên tồn tại**  
2) 🏫 **Lớp học phần tồn tại** và **còn chỗ** (`SoSinhVienHienTai + 1 ≤ SoSinhVienToiDa`)  
3) 📚 **Môn học tồn tại**  
4) 🔗 **Lớp học phần thuộc đúng môn học**  
5) 🚫 **Không được đăng ký trùng môn** (mỗi môn chỉ được đăng ký 1 lần)  
6) 🧮 Tính **soMon** & **tongSoTinChi** từ DB:
   - Nếu `tongSoTinChi + SoTinChiMonHoc > SOTINCHIMAX` → chặn
   - Nếu `soMon + 1 > SOMONHOCMAX` → chặn  
7) ✅ Insert đăng ký + cập nhật sĩ số lớp

### 🔁 3.2. Đổi lớp học phần
- Chỉ đổi **trong cùng một môn**
- Lớp mới phải còn chỗ
- Cập nhật sĩ số:
  - lớp cũ `-1`
  - lớp mới `+1`

### ❌ 3.3. Hủy đăng ký
- Xóa bản ghi đăng ký
- Giảm sĩ số lớp `-1`

---

## 4. Mô hình dữ liệu (gợi ý)

| Collection | Mục đích | Khóa chính / liên kết |
|---|---|---|
| `SinhVien` | thông tin sinh viên, tài khoản đăng nhập | `MasoSinhVien` |
| `MonHoc` | danh sách môn học, số tín chỉ | `MaMonHoc` |
| `LopHocPhan` | lớp mở theo môn | `MaLopHocPhan` → `MaMonHoc` |
| `DangKiHocPhan` | đăng ký học phần | `MasoSinhVien` + `MaMonHoc` + `MaLopHocPhan` |
| `PhanCongGiangDay` | phân công GV | `MaLopHocPhan` + `MaMonHoc`|

📌 Quan hệ nghiệp vụ:
- **1 Môn học** ➜ **N Lớp học phần**
- **1 Sinh viên** ➜ **N đăng ký học phần**
- **N Sinh viên** ⇄ **N Môn học** (thông qua `DangKiHocPhan`)

---

## 5. Kiến trúc & cấu trúc thư mục
### 🧩 Kiến trúc 3 tầng
- **Controller**: nhận request, validate input, trả response
- **Service**: xử lý nghiệp vụ (rule, flow, transaction logic)
- **Dtos**: xử lý nghiệp vụ kiểm tra các thuộc tính khởi tạo và update
- **Repository**: làm việc trực tiếp với MongoDB (CRUD, query)

### 🗂️ Cấu trúc thư mục (tham khảo)
```bash
├── 📁 Management-student
│   ├── 📁 ConnectDatabase                                  (Dùng để kết nối với databse)
│   │   └── 📄 ConnectDatabase.ts
│   ├── 📁 Controller                                       (Dùng để call API)
│   │   ├── 📄 DangKiHocPhan.ts
│   │   ├── 📄 DangNhap.ts
│   │   ├── 📄 GiangVien.ts
│   │   ├── 📄 LopHoc.ts
│   │   ├── 📄 MonHoc.ts
│   │   ├── 📄 PhanCongGiangDay.ts
│   │   └── 📄 SinhVien.ts
│   ├── 📁 Dtos                                             (Dùng để kiểm tra và khởi tạo các thuộc tính)
│   │   ├── 📁 DangKiHocPhan
│   │   │   ├── 📄 CreaateDangKiHocPhan.ts
│   │   │   └── 📄 UpdateDangKiHocPhan.ts
│   │   ├── 📁 DangNhap
│   │   │   └── 📄 DangNhapDto.ts
│   │   ├── 📁 GiangVien
│   │   │   ├── 📄 CreateGiangVien.ts
│   │   │   └── 📄 UpdateGiangVien.ts
│   │   ├── 📁 LopHocPhan
│   │   │   ├── 📄 CreateLopHocPhan.ts
│   │   │   └── 📄 UpdateLopHocPhan.ts
│   │   ├── 📁 MonHoc
│   │   │   ├── 📄 CreateMonHoc.ts
│   │   │   └── 📄 UpdateMonHoc.ts
│   │   ├── 📁 PhanCongGiangDay
│   │   │   ├── 📄 CreatePhanCongGiangDay.ts
│   │   │   └── 📄 UpdatePhanCongGiangDay.ts
│   │   └── 📁 SinhVien
│   │       ├── 📄 CreateSinhVien.ts
│   │       └── 📄 UpdateSinhVien.ts
│   ├── 📁 Enums                                          (Dùng để lưu trữ các enum của chương trình)
│   │   └── 📄 Enums.ts
│   ├── 📁 Middleware                                     (Chứa các file bảo mật cho chương trình)
│   │   ├── 📄 CheckToken.ts
│   │   ├── 📄 PhanQuyen.ts
│   │   └── 📄 XuLyToken.ts
│   ├── 📁 Repositories                                   (Chứa các file liên kết với database)
│   │   ├── 📄 BaseConnection.ts
│   │   ├── 📄 DangKiHocPhan.ts
│   │   ├── 📄 GiangVien.ts
│   │   ├── 📄 LopHocPhan.ts
│   │   ├── 📄 MonHoc.ts
│   │   ├── 📄 PhanCongGiangDay.ts
│   │   └── 📄 SinhVien.ts
│   ├── 📁 Service                                        (Chứa các file xử lý logic chính của chương trình)
│   │   ├── 📄 DangKiHocPhan.ts
│   │   ├── 📄 GiangVien.ts
│   │   ├── 📄 LopHocPhan.ts
│   │   ├── 📄 MonHoc.ts
│   │   ├── 📄 PhanCongGiangDay.ts
│   │   └── 📄 SinhVien.ts
│   ├── 📁 public
│   │   └── 🖼️ vite.svg
│   ├── 📁 scripts                                          (Chứa file dùng để insert database ban đầu)
│   │   └── 📄 InsertDataBaseBanDau.ts
│   ├── 📁 src
│   │   ├── 📁 tsoa
│   │   │   ├── 📄 routes.ts
│   │   │   └── ⚙️ swagger.json
│   │   ├── 📄 counter.ts
│   │   ├── 📄 main.ts
│   │   ├── 🎨 style.css
│   │   └── 🖼️ typescript.svg
│   ├── ⚙️ .gitignore
│   ├── 🌐 index.html
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json                                     (File cấu hình lệnh run)
│   ├── 📄 server.ts                                        (File cấu hình server)
│   ├── ⚙️ tsconfig.api.json
│   ├── ⚙️ tsconfig.json
│   └── ⚙️ tsoa.json                                        (File cấu hình)
├── 📁 TEST                                                 (Chứa các request để test chương trình)
│   ├── 📄 DangKiHocPhan.txt
│   ├── 📄 DangNhap.txt
│   ├── 📄 GiangVien.txt
│   ├── 📄 LopHocPhan.txt
│   ├── 📄 MonHoc.txt
│   ├── 📄 PhanCongGiangDay.txt
│   └── 📄 SinhVien.txt
├── ⚙️ .gitignore
├── 📝 README.md
├── ⚙️ package-lock.json
└── ⚙️ package.json
```

---

## 6. Công nghệ sử dụng
- 🟦 **TypeScript**
- ⚙️ **Node.js + Express**
- 🧾 **tsoa** (decorator-based routing + OpenAPI)
- 🗄️ **MongoDB** (mongodb driver)
- ✅ **class-validator**, **class-transformer**
- 🔐 **jsonwebtoken** (Access/Refresh token)
- 🔒 **bcryptjs** (hash mật khẩu)
- 🛡️ **helmet**, 🌐 **cors**, 🧾 **morgan**
- 🧪 Dev: **tsx** (watch), **typescript**

---

## 7. Cài đặt & chạy dự án
### 7.1. Yêu cầu
- Node.js ≥ 18
- MongoDB (local hoặc Atlas)

### 7.2. Cài dependencies
```bash
npm install
```

### 7.3. Tạo file `.env`
Tạo `.env` ở root (có thể copy từ `.env.example` nếu bạn có):

```env
# Server
PORT=3000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://127.0.0.1:27017
DB_NAME=ManagementStudent

# JWT
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# Security
PASSWORD_PEPPER=your_pepper
SALT_ROUNDS=10

# Login lock
SOLANDANGNHAPTHATBAITOIDA=3
TAIKHOANKHOATRONGKHOANG=15   # phút

# Đăng ký học phần
SOTINCHIMAX=40
SOMONHOCMAX=10

# CORS (optional)
CORS_ORIGIN=http://localhost:5173
```

### 7.5. Insert data ban đầu vào databse để thực thi
```bash
npm run seed
```

### 7.5. Generate routes + swagger (tsoa)
```bash
npm run tsoa:gen
```

### 7.6. Run API (dev)
```bash
npm run api
```

---

## 8. Swagger / API Docs
Sau khi chạy server, mở Swagger UI tại:
- 🌐 `http://localhost:3000/docs`

---

## 9. Ví dụ gọi API
### ✅ Đăng ký học phần
```bash
curl -X POST "http://localhost:3000/API/v1/DangKiHocPhan/CreateDangKiHocPhan" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
        "MasoSinhVien": "03355741521",
        "MaMonHoc": "mh741",
        "MaLopHocPhan": "lph789"
      }'
```

### 🔁 Đổi lớp học phần
```bash
curl -X PUT "http://localhost:3000/API/v1/DangKiHocPhan/DoiLophocPhan/03355741521/mh741/lph789" \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### ❌ Hủy đăng ký học phần
```bash
curl -X DELETE "http://localhost:3000/API/v1/DangKiHocPhan/HuyDangKiHocPhan/03355741521/mh741" \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

---

## 10. Quy tắc kiểm tra dữ liệu
### 🔐 Password policy (ví dụ theo service)
- Độ dài > 6 và ≤ 64
- Có chữ thường + chữ hoa + số + ký tự đặc biệt

### 📧 Email format
- Trim + lowercase
- Chặn email có `..`
- Regex email chuẩn

### 🔒 Lock account
- Sai mật khẩu quá `SOLANDANGNHAPTHATBAITOIDA`
- Khóa trong `TAIKHOANKHOATRONGKHOANG` phút

### 🧮 Credit & subject limit
- Không cho user nhập `SoTinChiDaDangKi`/`SoMonDaDangKi`
- Hệ thống tự tính từ DB (chỉ tính những đăng ký có `TrangThaiDangKi = DaDangKi`)

---

## 11. Troubleshooting
### 11.1. Swagger báo `TypeError: NetworkError when attempting to fetch resource`
Nguyên nhân thường gặp:
- 🔥 Server bị **crash** (throw lỗi chưa được handle) → browser báo NetworkError
- ❌ Endpoint PUT/DELETE không trả JSON đúng hoặc middleware lỗi
- 🧩 Ở một số trường hợp: Controller đang **validate sai object** (ví dụ validate trực tiếp `req` thay vì validate `body`)

✅ Cách xử lý nhanh:
- Mở terminal chạy server và xem log lỗi ngay lúc bấm Execute.
- Với endpoint **đổi lớp học phần** chỉ dùng path params, bạn có thể:
  - **Không cần validate DTO** (vì không có body)
  - Chỉ lấy `userRole` từ `req.user` và gọi service

### 11.2. Tính sai tín chỉ / số môn
- Đảm bảo collection `DangKiHocPhan` có lưu tín chỉ từng môn (ví dụ `SoTinChiMonHoc`)
- Hàm tính tổng nên sum theo **tín chỉ từng môn**, tránh sum theo trường “cộng dồn” nếu bạn lưu dạng cộng dồn.

### 11.3. Lỗi kết nối MongoDB
- Kiểm tra `MONGO_URI`, `DB_NAME`
- MongoDB đang chạy chưa (local service / Atlas IP whitelist)

---

## 12. Roadmap
- ✅ Hoàn thiện CRUD cho tất cả module
- 🔁 Transaction/Session cho các thao tác đổi lớp (update nhiều collection cùng lúc)
- 📊 Thống kê: tổng số tín chỉ theo học kỳ, lịch sử đăng ký
- 🧪 Unit test cho Service layer

---

### 📬 Liên hệ
- **Nickname:** Võ Anh Nhật  
- **Phonenumber:** 0335052899 
- **Email:** voanhnhat185@gmail.com