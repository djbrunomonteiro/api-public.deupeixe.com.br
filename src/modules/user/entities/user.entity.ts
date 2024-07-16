import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { EPermission, EUserStatus } from 'src/shared/enums/e-core';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ nullable: true })
  @IsUrl()
  @IsOptional()
  photo: string;

  @Column({ default: EPermission.CLIENT })
  @IsString()
  @IsNotEmpty()
  permission: EPermission;

  @Column({ default: EUserStatus.ACTIVE })
  @IsString()
  @IsNotEmpty()
  @IsNotEmpty()
  status: EUserStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
