import {
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileFastifyInterceptor } from 'fastify-file-interceptor';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Public } from '../auth/decorators';

@Controller('file')
export class FileController {
  @Post()
  @UseInterceptors(
    process.env.USE_FASTIFY === 'true'
      ? FileFastifyInterceptor('file', {
          storage: diskStorage({
            destination: './upload',
            filename: function (_, file, cb) {
              cb(null, file.originalname);
            },
          }),
        })
      : FileInterceptor('file', {
          storage: diskStorage({
            destination: './upload',
            filename: function (_, file, cb) {
              cb(null, file.originalname);
            },
          }),
        }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      filename: file.filename,
    };
    return response;
  }

  @Public()
  @Get(':filename')
  getFile(@Param('filename') filename: string): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'upload', filename));
    return new StreamableFile(file);
  }
}
