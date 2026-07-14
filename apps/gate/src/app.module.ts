import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '@app/infrastructure'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '@app/constants'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${process.env.NODE_ENV}.env`, '.env'],
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
})
export class AppModule {}
