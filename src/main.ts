import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.ORIGIN_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
  await app.listen(Number(process.env.BACKEND_PORT));
}
bootstrap();
