import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import * as fs from 'fs';
import * as morgan from 'morgan';

const logStream = fs.createWriteStream('api.log', {
  flags: 'a', // append
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  //? Setup StaticFolder Images
  app.useStaticAssets(join(__dirname, '..', './images'))
  app.use(morgan('tiny', { stream: logStream }));
  //? Enable Cors
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
