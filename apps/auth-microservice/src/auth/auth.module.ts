import { Module } from '@nestjs/common'
import { UserModule } from '../../../gate/src/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '@app/constants'
import { UserService } from '../../../user-microservice/src/user/user.service'
import { User } from '@app/entities'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}