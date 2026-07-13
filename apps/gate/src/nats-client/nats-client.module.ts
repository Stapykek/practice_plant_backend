import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: 'NATS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
            transport: Transport.NATS,
            options: {
            servers: [configService.get<string>('NATS_URL', '127.0.0.1:4222')],
            },
        }),
      },
    ]),
  ],
  exports: [
    ClientsModule.registerAsync([
      {
        name: 'NATS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: [configService.get<string>('NATS_URL', '127.0.0.1:4222')],
          },
        }),
      },
    ]),
  ],
})
export class NatsClientModule {}
