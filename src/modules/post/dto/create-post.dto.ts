import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsUrl,
} from 'class-validator';
import { EPostStatus } from 'src/shared/enums/e-core';

export class CreatePostDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsOptional()
  @IsString()
  resume: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  tags: string;

  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsEnum(EPostStatus)
  status: EPostStatus;

  @IsOptional()
  @IsString()
  metadata: string;
}
