import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Passkeys')
    .setDescription('Passkeys Backend API')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['*'],
    preflightContinue: true,
    credentials: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    optionsSuccessStatus: 204,
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  });

  await app.listen(configService.get<string>('app.port'));
}
bootstrap();
