import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.ORIGIN_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
  await app.listen(Number(process.env.BACKEND_PORT));
}
bootstrap();
