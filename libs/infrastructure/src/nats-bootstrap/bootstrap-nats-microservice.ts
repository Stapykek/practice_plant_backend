require('dotenv').config({
  path: process.env.NODE_ENV ? `${process.env.NODE_ENV}.env` : '.env',
});
import { IEntryNestModule, NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export async function bootstrapNatsMicroservice(
  moduleCls: IEntryNestModule,
  queueName?: string,
) {
  const NATS_URL = process.env.NATS_URL || '0.0.0.0:4222';

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    moduleCls,
    {
      transport: Transport.NATS,
      options: {
        servers: [NATS_URL],
        queue: queueName,
      }
    },
  )

  await app.listen();

  console.log(`Microservice listening to ${NATS_URL} on queue ${queueName}`);
}