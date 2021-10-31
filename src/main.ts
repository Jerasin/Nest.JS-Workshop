import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  // app.useGlobalPipes(new ValidationPipe());

  //? Setup StaticFolder Images
  app.useStaticAssets(join(__dirname, '..', './images'))
  
  //? Enable Cors
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
