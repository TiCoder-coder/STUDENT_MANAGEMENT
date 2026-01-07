import jwt, {JwtPayload} from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";
import { VaiTroNguoiDung } from "../Enums/Enums";

// Hàm này để định kiểm tra vài trò của người dùng là sinh viên mới có quyền truy cập chức năng mà nó được gán vào
export function RequireSinhVien(quyen: string){
    if (!quyen){ throw new Error("Không có quyền truy cập."); }
    if (quyen.toLowerCase() != VaiTroNguoiDung.SinhVien.toLowerCase()){
        throw new Error("Chỉ có sinh viên mới có thể thực hiện chức năng này.")
    }
}

// Hàm này dùng để định nghĩa quyền truy cập của người dùng là giảng viên mới có quyền truy cập chức năng mà nó đưọc gán vào
export function RequireGiangVien(quyen: string){
    if (!quyen){ throw new Error("Không có quyền truy cập."); }
    if (quyen.toLowerCase() != VaiTroNguoiDung.GiangVien.toLowerCase()){
        throw new Error("Chỉ có giảng viên mới có thể thực hiện chức năng này.")
    }
}

// Hàm này dùng để định nghĩa quyền truy cập của người dùng là admin mới có quyền truy cập chức năng mà nó đưọc gán vào
export function RequireAdmin(quyen: string){
    if (!quyen){ throw new Error("Không có quyền truy cập."); }
    if (quyen.toLowerCase() != VaiTroNguoiDung.Admin.toLowerCase()){
        throw new Error("Chỉ có admin mới có thể thực hiện chức năng này.")
    }
}

// Hàm này dùng để định nghĩa quyền truy cập của người dùng là giảng viên/admin mới có quyền truy cập chức năng mà nó đưọc gán vào
export function RequireGiangVienOrAdmin(quyen: string){
    if (!quyen){ throw new Error("Không có quyền truy cập."); }
    if (quyen.toLowerCase() != VaiTroNguoiDung.GiangVien.toLowerCase() && quyen.toLowerCase() != VaiTroNguoiDung.Admin.toLowerCase()){
        throw new Error("Chỉ có giảng viên và admin mới có thể thực hiện chức năng này.")
    }
}

// Hàm này dùng để định nghĩa quyền truy cập của người dùng là sinh viên/admin mới có quyền truy cập chức năng mà nó đưọc gán vào
export function RequireSinhVienOrAdmin(quyen: string){
    if (!quyen){ throw new Error("Không có quyền truy cập."); }
    if (quyen.toLowerCase() != VaiTroNguoiDung.SinhVien.toLowerCase() && quyen.toLowerCase() != VaiTroNguoiDung.Admin.toLowerCase()){
        throw new Error("Chỉ có sinh viên và admin mới có thể thực hiện chức năng này.")
    }
}

