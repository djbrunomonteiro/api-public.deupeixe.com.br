import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [AuthModule]
})
export class UploadModule {}
