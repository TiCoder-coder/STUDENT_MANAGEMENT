import {IsString, IsNumber, IsEnum, IsNotEmpty, Length, IsInt, Min, IsISIN, IsOptional} from "class-validator";

export class DangNhapDto {
    @IsString()
    @IsNotEmpty()
    UserName: string;

    @IsString()
    @IsNotEmpty()
    Password: string;
}