import { IsString } from 'class-validator';
import { EPostStatus } from 'src/shared/enums/e-core';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column('text')
  body: string;

  @Column({ type: 'varchar', length: 255, default: ''})
  resume: string;

  @Column({ type: 'varchar', length: 255, default: ''})
  category: string;

  @Column({type: 'varchar', default: ''} )
  tags: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  author: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  url: string;

  @Column({ type: 'varchar', length: 255, default: ''})
  @IsString()
  image: string;

  @Column({ type: 'varchar', length: 255, default: ''})
  @IsString()
  image_alt: string;

  @Column({ type: 'varchar', length: 255, default: ''})
  @IsString()
  image_source: string;

  @Column({ type: 'enum', enum: EPostStatus, default: EPostStatus.PUBLISHED})
  status: string;

  @Column({default: '', nullable: true})
  @IsString()
  metadata: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
