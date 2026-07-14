import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from '@app/database'


@Module({
  imports: [
    DatabaseModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AuthMicroserviceModule {}
