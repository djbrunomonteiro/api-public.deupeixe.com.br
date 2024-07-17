import {
    IsNumber,
    IsString,
  } from 'class-validator';
  import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity({
    name: 'tokens',
  })
  export class TokenEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    @IsString()
    access_token: string;

    @Column({nullable: false})
    @IsNumber()
    id_user: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  