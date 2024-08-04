import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { LinkEntity } from './entities/link.entity';

@Module({
  controllers: [LinkController],
  providers: [LinkService],
  imports: [
    TypeOrmModule.forFeature([LinkEntity]),
    AuthModule
  ]
})
export class LinkModule {}
