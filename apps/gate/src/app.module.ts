import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_HOST } from '@app/constants';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [NATS_HOST],
        }
      },
    ]),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
