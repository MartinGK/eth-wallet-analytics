import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Digital Wallet')
    .setDescription('Digital Wallet API')
    .setVersion('1.0.0')
    .addTag('nestjs')
    .build();

  app.use(cors());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}

bootstrap();
