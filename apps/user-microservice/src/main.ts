import { NestFactory } from '@nestjs/core';
import { UserMicroserviceModule } from './user-microservice.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NATS_HOST } from '@app/constants'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserMicroserviceModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [NATS_HOST],
      },
    },
  );
  await app.listen();
}
bootstrap();
