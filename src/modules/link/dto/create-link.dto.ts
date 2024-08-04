import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsEnum,
    IsUrl,
  } from 'class-validator';
  import { EPostStatus } from 'src/shared/enums/e-core';
  
  export class CreateLinkDto {
    @IsOptional()
    id: number;
  
    @IsNotEmpty()
    @IsString()
    title: string;
  
  
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
    @IsUrl()
    url: string;
  
    @IsOptional()
    @IsString()
    image: string;
  
    @IsOptional()
    @IsString()
    image_alt: string;
  
    @IsOptional()
    @IsString()
    image_source: string;
  
  
    @IsNotEmpty()
    @IsEnum(EPostStatus)
    status: EPostStatus;
  
    @IsOptional()
    @IsString()
    metadata: string;

    @IsOptional()
    @IsString()
    institutions: string
  }
  