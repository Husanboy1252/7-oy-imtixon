// src/main.ts
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('HH.uz Clone API')
    .setDescription('Ish qidirish platformasining backend tizimi')
    .setVersion('1.0')
    .addBearerAuth() // Token bilan ishlash uchun
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Swagger manzili

  await app.listen(4005);
}
bootstrap();
