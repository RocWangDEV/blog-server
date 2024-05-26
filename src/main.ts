import { NestFactory } from '@nestjs/core';
import {
  // ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  // 版本控制
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  // app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
