import { IsEmail, IsString } from 'class-validator';
import { EPermission, EUserStatus } from 'src/shared/enums/e-core';
export class CreateUserDto {
  id?: number;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  name: string;
  photo: string;
  permission: EPermission;
  status: EUserStatus;
}
