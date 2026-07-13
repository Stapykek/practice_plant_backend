import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    DatabaseModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class UserMicroserviceModule {}
