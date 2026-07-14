import {
  API_DESCRIPTION,
  API_TITLE,
  API_VERSION,
  SWAGGER_ROUTE,
} from '@app/constants'

require('dotenv').config({path: process.env.NODE_ENV ? `${process.env.NODE_ENV}.env` : '.env'});
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  const swaggerConfig = new DocumentBuilder()
    .setTitle(API_TITLE)
    .setDescription(API_DESCRIPTION)
    .setVersion(API_VERSION)
    .addBearerAuth()
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup(SWAGGER_ROUTE, app, documentFactory)

  const port = process.env.API_PORT || 3000
  await app.listen(port, () => console.log(`Server running on port: ${port};`));
}

bootstrap();
