import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import envConfiguration from './config/base.config';
import { HttpExceptionFilter } from './middlewares/http_exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  // Enable auto-validation using class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('G-Score API Documentation')
    .setDescription('The Multi-Feature Application API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(envConfiguration().port, '0.0.0.0');

  const serverUrl = await app.getUrl();
  console.log(`Application is running on: ${serverUrl}`);
  console.log(`Swagger documentation is available at: ${serverUrl}/api`);
}
bootstrap();
