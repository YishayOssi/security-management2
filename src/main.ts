import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; // שורה להוספה
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3010);
}
bootstrap();



