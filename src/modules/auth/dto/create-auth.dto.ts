import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateAuthDto {
    @IsNumber()
    id_user: number;
    @IsString()
    access_token: string;
}

export class LoginAuthDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class AuthTokenDto{
    @IsString()
    access_token: string;
}