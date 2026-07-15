import {
  API_DESCRIPTION,
  API_TITLE,
  API_VERSION,
  AUTH_CONTROLLER_DESCRIPTION,
  AUTH_CONTROLLER_TAG,
  DISEASE_CONTROLLER_DESCRIPTION,
  DISEASE_CONTROLLER_TAG,
  DISEASE_TAG_CONTROLLER_DESCRIPTION,
  DISEASE_TAG_CONTROLLER_TAG,
  PLANT_TYPE_CONTROLLER_DESCRIPTION,
  PLANT_TYPE_CONTROLLER_TAG,
  SWAGGER_ROUTE,
  USER_CONTROLLER_DESCRIPTION,
  USER_CONTROLLER_TAG,
  USER_PLANT_CONTROLLER_DESCRIPTION,
  USER_PLANT_CONTROLLER_TAG,
} from '@app/constants'

require('dotenv').config({path: process.env.NODE_ENV ? `${process.env.NODE_ENV}.env` : '.env'});
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }))

  const swaggerConfig = new DocumentBuilder()
    .setTitle(API_TITLE)
    .setDescription(API_DESCRIPTION)
    .setVersion(API_VERSION)
    .addBearerAuth()
    .addTag(USER_CONTROLLER_TAG, USER_CONTROLLER_DESCRIPTION)
    .addTag(AUTH_CONTROLLER_TAG, AUTH_CONTROLLER_DESCRIPTION)
    .addTag(PLANT_TYPE_CONTROLLER_TAG, PLANT_TYPE_CONTROLLER_DESCRIPTION)
    .addTag(DISEASE_CONTROLLER_TAG, DISEASE_CONTROLLER_DESCRIPTION)
    .addTag(USER_PLANT_CONTROLLER_TAG, USER_PLANT_CONTROLLER_DESCRIPTION)
    .addTag(DISEASE_TAG_CONTROLLER_TAG, DISEASE_TAG_CONTROLLER_DESCRIPTION)
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup(SWAGGER_ROUTE, app, documentFactory)

  const port = process.env.API_PORT || 3000
  await app.listen(port, () => console.log(`Server running on port: ${port};`));
}

bootstrap();
