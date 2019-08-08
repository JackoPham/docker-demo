import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api2');
  await app.listen(3100);
  console.log('http://localhost:3100');
}
bootstrap();
