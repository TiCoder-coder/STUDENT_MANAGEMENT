/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SinhVienController } from './../../Controller/SinhVien';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PhanCongGiangDayController } from './../../Controller/PhanCongGiangDay';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MonHocController } from './../../Controller/MonHoc';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LopHocController } from './../../Controller/LopHoc';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GiangVienController } from './../../Controller/GiangVien';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DangNhap } from './../../Controller/DangNhap';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DangKiHocPhanController } from './../../Controller/DangKiHocPhan';
import { expressAuthentication } from './../../Middleware/CheckToken';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "GioiTinh": {
        "dataType": "refEnum",
        "enums": ["Nam","Nu","Khac"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TrangThaiHoatDong": {
        "dataType": "refEnum",
        "enums": ["Danghoc","TamNgunghoc","KhongConHoc"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "VaiTroNguoiDung": {
        "dataType": "refEnum",
        "enums": ["SinhVien","GiangVien","Admin"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateSinhVien": {
        "dataType": "refObject",
        "properties": {
            "MasoSinhVien": {"dataType":"string","required":true},
            "HoVaTenSinhVien": {"dataType":"string","required":true},
            "NgaySinh": {"dataType":"datetime","required":true},
            "GioiTinhHocSinh": {"ref":"GioiTinh","required":true},
            "NoiSinh": {"dataType":"string","required":true},
            "ChuyenNghanh": {"dataType":"string","required":true},
            "KhoaHoc": {"dataType":"double","required":true},
            "TrangThai": {"ref":"TrangThaiHoatDong","required":true},
            "VaiTro": {"ref":"VaiTroNguoiDung","default":"SinhVien"},
            "Email": {"dataType":"string","required":true},
            "UserName": {"dataType":"string","required":true},
            "Password": {"dataType":"string","required":true},
            "SoLamDangNhapThatBai": {"dataType":"double","default":0},
            "KhongChoDangNhapToi": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"default":null},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateSinhVien": {
        "dataType": "refObject",
        "properties": {
            "MasoSinhVien": {"dataType":"string","required":true},
            "HoVaTenSinhVien": {"dataType":"string","required":true},
            "NgaySinh": {"dataType":"datetime","required":true},
            "GioiTinhHocSinh": {"ref":"GioiTinh","required":true},
            "NoiSinh": {"dataType":"string","required":true},
            "ChuyenNghanh": {"dataType":"string","required":true},
            "KhoaHoc": {"dataType":"double","required":true},
            "TrangThai": {"ref":"TrangThaiHoatDong","required":true},
            "VaiTro": {"ref":"VaiTroNguoiDung","default":"SinhVien"},
            "Email": {"dataType":"string","required":true},
            "UserName": {"dataType":"string","required":true},
            "Password": {"dataType":"string","required":true},
            "SoLamDangNhapThatBai": {"dataType":"double","required":true},
            "KhongChoDangNhapToi": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreatePhanCongGiangDay": {
        "dataType": "refObject",
        "properties": {
            "MaSoGiangVien": {"dataType":"string","required":true},
            "MaLopHocPhan": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PhanCongGiangDay": {
        "dataType": "refObject",
        "properties": {
            "MaSoGiangVien": {"dataType":"string","required":true},
            "MaLopHocPhan": {"dataType":"string","required":true},
            "createAt": {"dataType":"datetime"},
            "updateAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdatePhanCongGiangDay": {
        "dataType": "refObject",
        "properties": {
            "MaSoGiangVien": {"dataType":"string","required":true},
            "MaLopHocPhan": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MonHocBatBuoc": {
        "dataType": "refEnum",
        "enums": ["Co","Khong"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HinhThucHoc": {
        "dataType": "refEnum",
        "enums": ["Online","Offline"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateMonHoc": {
        "dataType": "refObject",
        "properties": {
            "MaMonHoc": {"dataType":"string","required":true},
            "TenMonHoc": {"dataType":"string","required":true},
            "BatBuoc": {"ref":"MonHocBatBuoc","default":"Co"},
            "SoTinChi": {"dataType":"double","required":true},
            "HocPhiMonHoc": {"dataType":"double","required":true},
            "HinhThucHoc": {"ref":"HinhThucHoc","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateMonHoc": {
        "dataType": "refObject",
        "properties": {
            "MaMonHoc": {"dataType":"string","required":true},
            "TenMonHoc": {"dataType":"string","required":true},
            "BatBuoc": {"ref":"MonHocBatBuoc","default":"Co"},
            "SoTinChi": {"dataType":"double","required":true},
            "HocPhiMonHoc": {"dataType":"double","required":true},
            "HinhThucHoc": {"ref":"HinhThucHoc","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TrangThaiLopHoc": {
        "dataType": "refEnum",
        "enums": ["DangHoatDong","NgungHoatDong"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateMaLopHocPhan": {
        "dataType": "refObject",
        "properties": {
            "MaLopHocPhan": {"dataType":"string","required":true},
            "MaMonHoc": {"dataType":"string","required":true},
            "NgayBatDau": {"dataType":"datetime","required":true},
            "NgayKetThuc": {"dataType":"datetime","required":true},
            "SoSinhVienToiThieu": {"dataType":"double","required":true},
            "SoSinhVienToiDa": {"dataType":"double","required":true},
            "SoSinhVienHienTai": {"dataType":"double","required":true},
            "TrangThaiLopHoc": {"ref":"TrangThaiLopHoc","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateMaLopHocPhan": {
        "dataType": "refObject",
        "properties": {
            "MaLopHocPhan": {"dataType":"string","required":true},
            "MaMonHoc": {"dataType":"string","required":true},
            "NgayBatDau": {"dataType":"datetime","required":true},
            "NgayKetThuc": {"dataType":"datetime","required":true},
            "SoSinhVienToiThieu": {"dataType":"double","required":true},
            "SoSinhVienToiDa": {"dataType":"double","required":true},
            "SoSinhVienHienTai": {"dataType":"double","required":true},
            "TrangThaiLopHoc": {"ref":"TrangThaiLopHoc","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TrangThaiHoatDongGiangVien": {
        "dataType": "refEnum",
        "enums": ["DangDay","TamNgungDay","KhongConDay"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateGiangVien": {
        "dataType": "refObject",
        "properties": {
            "MaSoGiangVien": {"dataType":"string","required":true},
            "TenGiangVien": {"dataType":"string","required":true},
            "NgaySinh": {"dataType":"datetime","required":true},
            "NoiSinh": {"dataType":"string","required":true},
            "GioiTinhGiangVien": {"ref":"GioiTinh","required":true},
            "ChuyenNghanh": {"dataType":"string","required":true},
            "TrangThai": {"ref":"TrangThaiHoatDongGiangVien","required":true},
            "VaiTro": {"ref":"VaiTroNguoiDung","default":"GiangVien"},
            "Email": {"dataType":"string","required":true},
            "UserName": {"dataType":"string","required":true},
            "Password": {"dataType":"string","required":true},
            "SoLamDangNhapThatBai": {"dataType":"double","default":0},
            "KhongChoDangNhapToi": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"default":null},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateGiangVien": {
        "dataType": "refObject",
        "properties": {
            "MaSoGiangVien": {"dataType":"string","required":true},
            "TenGiangVien": {"dataType":"string","required":true},
            "NgaySinh": {"dataType":"datetime","required":true},
            "NoiSinh": {"dataType":"string","required":true},
            "GioiTinhGiangVien": {"ref":"GioiTinh","required":true},
            "ChuyenNghanh": {"dataType":"string","required":true},
            "TrangThai": {"ref":"TrangThaiHoatDongGiangVien","required":true},
            "VaiTro": {"ref":"VaiTroNguoiDung","default":"GiangVien"},
            "Email": {"dataType":"string","required":true},
            "UserName": {"dataType":"string","required":true},
            "Password": {"dataType":"string","required":true},
            "SoLamDangNhapThatBai": {"dataType":"double","default":0},
            "KhongChoDangNhapToi": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"default":null},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DangNhapDto": {
        "dataType": "refObject",
        "properties": {
            "UserName": {"dataType":"string","required":true},
            "Password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TrangThaiDangKi": {
        "dataType": "refEnum",
        "enums": ["DaDangKi","DaHuy"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateDangKihocPhan": {
        "dataType": "refObject",
        "properties": {
            "MasoSinhVien": {"dataType":"string","required":true},
            "MaMonHoc": {"dataType":"string","required":true},
            "MaLopHocPhan": {"dataType":"string","required":true},
            "TrangThaiDangKi": {"ref":"TrangThaiDangKi","default":"DaDangKi"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsSinhVienController_PostSinhVien: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateSinhVien"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/API/v1/SinhVien/PostSinhVien',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(SinhVienController)),
            ...(fetchMiddlewares<RequestHandler>(SinhVienController.prototype.PostSinhVien)),

            async function SinhVienController_PostSinhVien(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSinhVienController_PostSinhVien, request, response });

                const controller = new SinhVienController();

              await templateService.apiHandler({
                methodName: 'PostSinhVien',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSinhVienController_GetOneSinhVien: Record<string, TsoaRoute.ParameterSchema> = {
                MasoSinhVien: {"in":"path","name":"MasoSinhVien","required":true,"dataType":"string"},
        };
        app.get('/API/v1/SinhVien/GetOneSinhVien/:MasoSinhVien',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(SinhVienController)),
            ...(fetchMiddlewares<RequestHandler>(SinhVienController.prototype.GetOneSinhVien)),

            async function SinhVienController_GetOneSinhVien(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSinhVienController_GetOneSinhVien, request, response });

                const controller = new SinhVienController();

              await templateService.apiHandler({
                methodName: 'GetOneSinhVien',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSinhVienController_GetAllSinhVien: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/API/v1/SinhVien/GetAllSinhVien',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(SinhVienController)),
            ...(fetchMiddlewares<RequestHandler>(SinhVienController.prototype.GetAllSinhVien)),

            async function SinhVienController_GetAllSinhVien(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSinhVienController_GetAllSinhVien, request, response });

                const controller = new SinhVienController();

              await templateService.apiHandler({
                methodName: 'GetAllSinhVien',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSinhVienController_UpdateOneSinhVien: Record<string, TsoaRoute.ParameterSchema> = {
                MasoSinhVien: {"in":"path","name":"MasoSinhVien","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateSinhVien"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.put('/API/v1/SinhVien/UpdateOneSinhVien/:MasoSinhVien',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(SinhVienController)),
            ...(fetchMiddlewares<RequestHandler>(SinhVienController.prototype.UpdateOneSinhVien)),

            async function SinhVienController_UpdateOneSinhVien(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSinhVienController_UpdateOneSinhVien, request, response });

                const controller = new SinhVienController();

              await templateService.apiHandler({
                methodName: 'UpdateOneSinhVien',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSinhVienController_DeleteOneSinhVien: Record<string, TsoaRoute.ParameterSchema> = {
                MasoSinhVien: {"in":"path","name":"MasoSinhVien","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/API/v1/SinhVien/DeleteOneSinhVien/:MasoSinhVien',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(SinhVienController)),
            ...(fetchMiddlewares<RequestHandler>(SinhVienController.prototype.DeleteOneSinhVien)),

            async function SinhVienController_DeleteOneSinhVien(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSinhVienController_DeleteOneSinhVien, request, response });

                const controller = new SinhVienController();

              await templateService.apiHandler({
                methodName: 'DeleteOneSinhVien',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPhanCongGiangDayController_createPhanCongGiangDay: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreatePhanCongGiangDay"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/API/v1/PhanCongGiangDay/CreatePhanCongGiangDay',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PhanCongGiangDayController)),
            ...(fetchMiddlewares<RequestHandler>(PhanCongGiangDayController.prototype.createPhanCongGiangDay)),

            async function PhanCongGiangDayController_createPhanCongGiangDay(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPhanCongGiangDayController_createPhanCongGiangDay, request, response });

                const controller = new PhanCongGiangDayController();

              await templateService.apiHandler({
                methodName: 'createPhanCongGiangDay',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPhanCongGiangDayController_timkiemPhanCongGiangDay: Record<string, TsoaRoute.ParameterSchema> = {
                MaSoGiangVien: {"in":"path","name":"MaSoGiangVien","required":true,"dataType":"string"},
                MaLopHocPhan: {"in":"path","name":"MaLopHocPhan","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/API/v1/PhanCongGiangDay/TimkiemPhanCongGiangDay/:MaSoGiangVien/:MaLopHocPhan',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PhanCongGiangDayController)),
            ...(fetchMiddlewares<RequestHandler>(PhanCongGiangDayController.prototype.timkiemPhanCongGiangDay)),

            async function PhanCongGiangDayController_timkiemPhanCongGiangDay(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPhanCongGiangDayController_timkiemPhanCongGiangDay, request, response });

                const controller = new PhanCongGiangDayController();

              await templateService.apiHandler({
                methodName: 'timkiemPhanCongGiangDay',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPhanCongGiangDayController_lietKePhanCongHocPhan: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/API/v1/PhanCongGiangDay/LietKePhanCongHocPhan',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PhanCongGiangDayController)),
            ...(fetchMiddlewares<RequestHandler>(PhanCongGiangDayController.prototype.lietKePhanCongHocPhan)),

            async function PhanCongGiangDayController_lietKePhanCongHocPhan(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPhanCongGiangDayController_lietKePhanCongHocPhan, request, response });

                const controller = new PhanCongGiangDayController();

              await templateService.apiHandler({
                methodName: 'lietKePhanCongHocPhan',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPhanCongGiangDayController_capNhapLopHocPhan: Record<string, TsoaRoute.ParameterSchema> = {
                MaLopHocPhan: {"in":"path","name":"MaLopHocPhan","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdatePhanCongGiangDay"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.put('/API/v1/PhanCongGiangDay/CapNhapLopHocPhan/:MaLopHocPhan',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PhanCongGiangDayController)),
            ...(fetchMiddlewares<RequestHandler>(PhanCongGiangDayController.prototype.capNhapLopHocPhan)),

            async function PhanCongGiangDayController_capNhapLopHocPhan(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPhanCongGiangDayController_capNhapLopHocPhan, request, response });

                const controller = new PhanCongGiangDayController();

              await templateService.apiHandler({
                methodName: 'capNhapLopHocPhan',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPhanCongGiangDayController_xoaLopHocPhan: Record<string, TsoaRoute.ParameterSchema> = {
                MaSoGiangVien: {"in":"path","name":"MaSoGiangVien","required":true,"dataType":"string"},
                MaLopHocPhan: {"in":"path","name":"MaLopHocPhan","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/API/v1/PhanCongGiangDay/XoaLopHocPhan/:MaSoGiangVien/:MaLopHocPhan',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PhanCongGiangDayController)),
            ...(fetchMiddlewares<RequestHandler>(PhanCongGiangDayController.prototype.xoaLopHocPhan)),

            async function PhanCongGiangDayController_xoaLopHocPhan(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPhanCongGiangDayController_xoaLopHocPhan, request, response });

                const controller = new PhanCongGiangDayController();

              await templateService.apiHandler({
                methodName: 'xoaLopHocPhan',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMonHocController_createMonHoc: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateMonHoc"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/API/v1/MonHoc/CreateMonHoc',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(MonHocController)),
            ...(fetchMiddlewares<RequestHandler>(MonHocController.prototype.createMonHoc)),

            async function MonHocController_createMonHoc(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMonHocController_createMonHoc, request, response });

                const controller = new MonHocController();

              await templateService.apiHandler({
                methodName: 'createMonHoc',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMonHocController_getOneMonHoc: Record<string, TsoaRoute.ParameterSchema> = {
                MaMonHoc: {"in":"path","name":"MaMonHoc","required":true,"dataType":"string"},
        };
        app.get('/API/v1/MonHoc/GetOneMonHoc/:MaMonHoc',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(MonHocController)),
            ...(fetchMiddlewares<RequestHandler>(MonHocController.prototype.getOneMonHoc)),

            async function MonHocController_getOneMonHoc(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMonHocController_getOneMonHoc, request, response });

                const controller = new MonHocController();

              await templateService.apiHandler({
                methodName: 'getOneMonHoc',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMonHocController_getAllMonHoc: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/API/v1/MonHoc/GetAllMonHoc',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(MonHocController)),
            ...(fetchMiddlewares<RequestHandler>(MonHocController.prototype.getAllMonHoc)),

            async function MonHocController_getAllMonHoc(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMonHocController_getAllMonHoc, request, response });

                const controller = new MonHocController();

              await templateService.apiHandler({
                methodName: 'getAllMonHoc',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMonHocController_CapNhapMonHoc: Record<string, TsoaRoute.ParameterSchema> = {
                MaMonHoc: {"in":"path","name":"MaMonHoc","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateMonHoc"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.put('/API/v1/MonHoc/CapNhapMonHoc/:MaMonHoc',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(MonHocController)),
            ...(fetchMiddlewares<RequestHandler>(MonHocController.prototype.CapNhapMonHoc)),

            async function MonHocController_CapNhapMonHoc(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMonHocController_CapNhapMonHoc, request, response });

                const controller = new MonHocController();

              await templateService.apiHandler({
                methodName: 'CapNhapMonHoc',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMonHocController_DeleteMonHoc: Record<string, TsoaRoute.ParameterSchema> = {
                MaMonHoc: {"in":"path","name":"MaMonHoc","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/API/v1/MonHoc/DeleteMonHoc/:MaMonHoc',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(MonHocController)),
            ...(fetchMiddlewares<RequestHandler>(MonHocController.prototype.DeleteMonHoc)),

            async function MonHocController_DeleteMonHoc(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMonHocController_DeleteMonHoc, request, response });

                const controller = new MonHocController();

              await templateService.apiHandler({
                methodName: 'DeleteMonHoc',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLopHocController_createLopHoc: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateMaLopHocPhan"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/API/v1/LopHoc/CreateLopHoc',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LopHocController)),
            ...(fetchMiddlewares<RequestHandler>(LopHocController.prototype.createLopHoc)),

            async function LopHocController_createLopHoc(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLopHocController_createLopHoc, request, response });

                const controller = new LopHocController();

              await templateService.apiHandler({
                methodName: 'createLopHoc',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLopHocController_getOneLopHoc: Record<string, TsoaRoute.ParameterSchema> = {
                MaLopHocPhan: {"in":"path","name":"MaLopHocPhan","required":true,"dataType":"string"},
        };
        app.get('/API/v1/LopHoc/GetOneLopHoc/:MaLopHocPhan',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LopHocController)),
            ...(fetchMiddlewares<RequestHandler>(LopHocController.prototype.getOneLopHoc)),

            async function LopHocController_getOneLopHoc(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLopHocController_getOneLopHoc, request, response });

                const controller = new LopHocController();

              await templateService.apiHandler({
                methodName: 'getOneLopHoc',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLopHocController_getAllLopHoc: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/API/v1/LopHoc/GetAllLopHoc',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LopHocController)),
            ...(fetchMiddlewares<RequestHandler>(LopHocController.prototype.getAllLopHoc)),

            async function LopHocController_getAllLopHoc(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLopHocController_getAllLopHoc, request, response });

                const controller = new LopHocController();

              await templateService.apiHandler({
                methodName: 'getAllLopHoc',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLopHocController_updateMonHoc: Record<string, TsoaRoute.ParameterSchema> = {
                MaLopHocPhan: {"in":"path","name":"MaLopHocPhan","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateMaLopHocPhan"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.put('/API/v1/LopHoc/UpdateLopHoc/:MaLopHocPhan',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LopHocController)),
            ...(fetchMiddlewares<RequestHandler>(LopHocController.prototype.updateMonHoc)),

            async function LopHocController_updateMonHoc(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLopHocController_updateMonHoc, request, response });

                const controller = new LopHocController();

              await templateService.apiHandler({
                methodName: 'updateMonHoc',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLopHocController_deleteMonHoc: Record<string, TsoaRoute.ParameterSchema> = {
                MaLopHocPhan: {"in":"path","name":"MaLopHocPhan","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/API/v1/LopHoc/DeleteMonHoc/:MaLopHocPhan',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LopHocController)),
            ...(fetchMiddlewares<RequestHandler>(LopHocController.prototype.deleteMonHoc)),

            async function LopHocController_deleteMonHoc(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLopHocController_deleteMonHoc, request, response });

                const controller = new LopHocController();

              await templateService.apiHandler({
                methodName: 'deleteMonHoc',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsGiangVienController_PostGiangVien: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateGiangVien"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/API/v1/GiangVien/CreateGiangVien',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GiangVienController)),
            ...(fetchMiddlewares<RequestHandler>(GiangVienController.prototype.PostGiangVien)),

            async function GiangVienController_PostGiangVien(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGiangVienController_PostGiangVien, request, response });

                const controller = new GiangVienController();

              await templateService.apiHandler({
                methodName: 'PostGiangVien',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsGiangVienController_GetOneGiangVien: Record<string, TsoaRoute.ParameterSchema> = {
                MaSoGiangVien: {"in":"path","name":"MaSoGiangVien","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/API/v1/GiangVien/GetOneGiangVien/:MaSoGiangVien',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GiangVienController)),
            ...(fetchMiddlewares<RequestHandler>(GiangVienController.prototype.GetOneGiangVien)),

            async function GiangVienController_GetOneGiangVien(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGiangVienController_GetOneGiangVien, request, response });

                const controller = new GiangVienController();

              await templateService.apiHandler({
                methodName: 'GetOneGiangVien',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsGiangVienController_GetAllSinhVien: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/API/v1/GiangVien/GetAllGiangVien',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GiangVienController)),
            ...(fetchMiddlewares<RequestHandler>(GiangVienController.prototype.GetAllSinhVien)),

            async function GiangVienController_GetAllSinhVien(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGiangVienController_GetAllSinhVien, request, response });

                const controller = new GiangVienController();

              await templateService.apiHandler({
                methodName: 'GetAllSinhVien',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsGiangVienController_UpdateOneSinhVien: Record<string, TsoaRoute.ParameterSchema> = {
                MaSoGiangVien: {"in":"path","name":"MaSoGiangVien","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateGiangVien"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.put('/API/v1/GiangVien/UpdateOneGiangVien/:MaSoGiangVien',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GiangVienController)),
            ...(fetchMiddlewares<RequestHandler>(GiangVienController.prototype.UpdateOneSinhVien)),

            async function GiangVienController_UpdateOneSinhVien(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGiangVienController_UpdateOneSinhVien, request, response });

                const controller = new GiangVienController();

              await templateService.apiHandler({
                methodName: 'UpdateOneSinhVien',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsGiangVienController_DeleteOneSinhVien: Record<string, TsoaRoute.ParameterSchema> = {
                MaSoGiangVien: {"in":"path","name":"MaSoGiangVien","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/API/v1/GiangVien/DeleteOneGiangVien/:MaSoGiangVien',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GiangVienController)),
            ...(fetchMiddlewares<RequestHandler>(GiangVienController.prototype.DeleteOneSinhVien)),

            async function GiangVienController_DeleteOneSinhVien(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGiangVienController_DeleteOneSinhVien, request, response });

                const controller = new GiangVienController();

              await templateService.apiHandler({
                methodName: 'DeleteOneSinhVien',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDangNhap_Login: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"DangNhapDto"},
        };
        app.post('/API/v1/DangNhap/Login/:UserName/:Password',
            ...(fetchMiddlewares<RequestHandler>(DangNhap)),
            ...(fetchMiddlewares<RequestHandler>(DangNhap.prototype.Login)),

            async function DangNhap_Login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDangNhap_Login, request, response });

                const controller = new DangNhap();

              await templateService.apiHandler({
                methodName: 'Login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDangNhap_LoginAgain: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"RefreshToken":{"dataType":"string","required":true}}},
        };
        app.post('/API/v1/DangNhap/LoginAgain',
            ...(fetchMiddlewares<RequestHandler>(DangNhap)),
            ...(fetchMiddlewares<RequestHandler>(DangNhap.prototype.LoginAgain)),

            async function DangNhap_LoginAgain(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDangNhap_LoginAgain, request, response });

                const controller = new DangNhap();

              await templateService.apiHandler({
                methodName: 'LoginAgain',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDangNhap_Logout: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"RefreshToken":{"dataType":"string","required":true}}},
        };
        app.post('/API/v1/DangNhap/Logout',
            ...(fetchMiddlewares<RequestHandler>(DangNhap)),
            ...(fetchMiddlewares<RequestHandler>(DangNhap.prototype.Logout)),

            async function DangNhap_Logout(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDangNhap_Logout, request, response });

                const controller = new DangNhap();

              await templateService.apiHandler({
                methodName: 'Logout',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDangKiHocPhanController_createDangKiHocPhan: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateDangKihocPhan"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/API/v1/DangKiHocPhan/CreateDangKiHocPhan',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(DangKiHocPhanController)),
            ...(fetchMiddlewares<RequestHandler>(DangKiHocPhanController.prototype.createDangKiHocPhan)),

            async function DangKiHocPhanController_createDangKiHocPhan(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDangKiHocPhanController_createDangKiHocPhan, request, response });

                const controller = new DangKiHocPhanController();

              await templateService.apiHandler({
                methodName: 'createDangKiHocPhan',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDangKiHocPhanController_TImKiemLopHocPhanDaDangKi: Record<string, TsoaRoute.ParameterSchema> = {
                MasoSinhVien: {"in":"path","name":"MasoSinhVien","required":true,"dataType":"string"},
                MaMonHoc: {"in":"path","name":"MaMonHoc","required":true,"dataType":"string"},
        };
        app.get('/API/v1/DangKiHocPhan/TimKiemLopHocPhanDaDangKi/:MasoSinhVien/:MaMonHoc',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(DangKiHocPhanController)),
            ...(fetchMiddlewares<RequestHandler>(DangKiHocPhanController.prototype.TImKiemLopHocPhanDaDangKi)),

            async function DangKiHocPhanController_TImKiemLopHocPhanDaDangKi(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDangKiHocPhanController_TImKiemLopHocPhanDaDangKi, request, response });

                const controller = new DangKiHocPhanController();

              await templateService.apiHandler({
                methodName: 'TImKiemLopHocPhanDaDangKi',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDangKiHocPhanController_doiLophocPhan: Record<string, TsoaRoute.ParameterSchema> = {
                MasoSinhVien: {"in":"path","name":"MasoSinhVien","required":true,"dataType":"string"},
                MaMonHoc: {"in":"path","name":"MaMonHoc","required":true,"dataType":"string"},
                MaLopHocPhan: {"in":"path","name":"MaLopHocPhan","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.put('/API/v1/DangKiHocPhan/DoiLophocPhan/:MasoSinhVien/:MaMonHoc/:MaLopHocPhan',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(DangKiHocPhanController)),
            ...(fetchMiddlewares<RequestHandler>(DangKiHocPhanController.prototype.doiLophocPhan)),

            async function DangKiHocPhanController_doiLophocPhan(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDangKiHocPhanController_doiLophocPhan, request, response });

                const controller = new DangKiHocPhanController();

              await templateService.apiHandler({
                methodName: 'doiLophocPhan',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDangKiHocPhanController_huyDangKiHocPhan: Record<string, TsoaRoute.ParameterSchema> = {
                MasoSinhVien: {"in":"path","name":"MasoSinhVien","required":true,"dataType":"string"},
                MaMonHoc: {"in":"path","name":"MaMonHoc","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/API/v1/DangKiHocPhan/HuyDangKiHocPhan/:MasoSinhVien/:MaMonHoc',
            authenticateMiddleware([{"bearerAuth":[]}]),
            ...(fetchMiddlewares<RequestHandler>(DangKiHocPhanController)),
            ...(fetchMiddlewares<RequestHandler>(DangKiHocPhanController.prototype.huyDangKiHocPhan)),

            async function DangKiHocPhanController_huyDangKiHocPhan(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDangKiHocPhanController_huyDangKiHocPhan, request, response });

                const controller = new DangKiHocPhanController();

              await templateService.apiHandler({
                methodName: 'huyDangKiHocPhan',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
