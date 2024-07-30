import { Controller, Post, UseInterceptors, UploadedFile, UseGuards} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller({
  path: 'upload',
  version: '1'
})

export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(@UploadedFile() file) {;
    return this.uploadService.create(file);
  }

}
