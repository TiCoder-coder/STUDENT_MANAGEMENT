// Enum để nhận biết môn học có bắt buộc hay không
export enum MonHocBatBuoc{Co = 'Co', Khong = 'Khong'}

// Enum để nhận biết sinh viên có còn đang hoạt động hay không
export enum TrangThaiHoatDong{DangHoc = 'Danghoc', TamNgunghoc = 'TamNgunghoc', KhongConHoc = 'KhongConHoc'}

// Enum để nhận biết giảng viên còn đang dạy ở trưởng hay không
export enum TrangThaiHoatDongGiangVien{DangDay = 'DangDay', TamNgungDay = 'TamNgungDay', KhongConDay = 'KhongConDay'}

// Enum đểnhận biết giới tính của sinh viên/ giảng viên
export enum GioiTinh{Nam = 'Nam', Nu = 'Nu', Khac = 'Khac'}

// Enum để nhận biết lớp học có đang hoạt động hay không 
export enum TrangThaiLopHoc{DangHoatDong = 'DangHoatDong', NgungHoatDong = 'NgungHoatDong'}

// Enum để xác nhận trạng thái đăng kí môn học có thành công hay không
export enum TrangThaiDangKi{DaDangKi = 'DaDangKi', DaDuy = 'DaHuy'}

// Enum để nhận biết hình thức học tập cho môn=
export enum HinhThucHoc{Online = 'Online', Offline = 'Offline'}

// Enum để nhận biết vai trò của người dùng
export enum VaiTroNguoiDung{SinhVien = 'SinhVien', GiangVien = 'GiangVien', Admin = 'Admin'}