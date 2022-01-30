import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import multer from 'fastify-multer';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { AppModule } from './app.module';
import { getLogLevels, writeToLogs } from './utils';

async function bootstrap() {
  let app: NestFastifyApplication | INestApplication;

  if (process.env.USE_FASTIFY === 'true') {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
      {
        logger: getLogLevels(process.env.LOGGER_LVL),
      },
    );
    (app as NestFastifyApplication).register(multer.contentParser);
  } else {
    app = await NestFactory.create(AppModule, {
      logger: getLogLevels(process.env.LOGGER_LVL),
    });
  }

  const swaggerDocument = yaml.load(
    readFileSync(join(__dirname, '../doc/api.yaml'), 'utf-8'),
  ) as OpenAPIObject;

  SwaggerModule.setup('/doc', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT, '0.0.0.0');
}

bootstrap().then(() =>
  writeToLogs(`Service listening: ${process.env.PORT}`, 'log'),
);
