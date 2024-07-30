import { Injectable } from '@nestjs/common';
import * as ftp from 'basic-ftp';
import { ConfigService } from '@nestjs/config';
import * as sharp from 'sharp';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {}

  async create(file: any) {
    const timestamp = new Date().getTime();
    // Nomes do arquivo
    const name = `${timestamp}.webp`;

    try {
      // Processar e salvar as versões da imagem
      await this.processAndUploadImage(file.buffer, 'sm', name, 400);
      await this.processAndUploadImage(file.buffer, 'md', name, 800);
      await this.processAndUploadImage(file.buffer, 'lg', name, 1200);

      return {
        status: 200,
        message: 'Upload com sucesso!',
        results: { url: name },
      };
    } catch (err) {
      throw new Error('Erro ao enviar as imagens via FTP');
    } 
  }

  private async processAndUploadImage(
    buffer: Buffer,
    folder: string,
    fileName: string,
    size: number,
  ) {
    // Redimensiona a imagem
    
    const client = new ftp.Client();
    try {
      const resizedBuffer = await sharp(buffer)
        .resize(size, size, { fit: sharp.fit.inside, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      await client.access({
        host: this.configService.get('FTP_HOST'),
        user: this.configService.get('FTP_USER'),
        password: this.configService.get('FTP_PASSWORD'),
      });

      // Define o diretório remoto onde você quer salvar a imagem no servidor FTP
      await client.ensureDir(`public_html/uploads/${folder}`);

      // Cria um stream a partir do buffer processado
      const imageStream = Readable.from(resizedBuffer);

      // Envia o arquivo
      await client.uploadFrom(imageStream, fileName);
    } catch (error) {
      throw new Error('Erro ao enviar as imagens via FTP');
    }finally {
      client.close();
    }
  }
}
