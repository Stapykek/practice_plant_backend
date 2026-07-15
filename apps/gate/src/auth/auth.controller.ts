import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as DTO from './dto'
import { AUTH_CONTROLLER_TAG, AuthSubject } from '@app/constants'
import { firstValueFrom } from 'rxjs'
import { handleServiceResponse } from '@app/utils'
import { Public } from '@app/infrastructure'
import { SignInResponse, SignUpResponse } from '@app/types/auth'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Public()
@ApiTags(AUTH_CONTROLLER_TAG)
@Controller('auth')
export class AuthController {

  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy
  ) {}

  @ApiOperation({ summary: 'Зарегистрироваться как администратор' })
  @Post('/signup/admin')
  async signUpAdmin(@Body() body: DTO.SignUpRequestDto): Promise<SignUpResponse> {
    const response = await firstValueFrom(this.natsClient.send<SignUpResponse>({cmd: AuthSubject.SIGN_UP_ADMIN}, body))
    return handleServiceResponse(response)
  }

  @ApiOperation({ summary: 'Зарегистрироваться как обычный пользователь' })
  @Post('/signup/standard')
  async signUpStandard(@Body() body: DTO.SignUpRequestDto): Promise<SignUpResponse>{
    const response = await firstValueFrom(this.natsClient.send<SignUpResponse>({cmd: AuthSubject.SIGN_UP_STANDARD}, body))
    return handleServiceResponse(response)
  }

  @ApiOperation({ summary: 'Войти в аккаунт' })
  @Post('signin')
  async signIn(@Body() body: DTO.SignInRequestDto): Promise<SignInResponse> {
    const response = await firstValueFrom(this.natsClient.send<SignInResponse>({cmd: AuthSubject.SIGN_IN}, body))
    return handleServiceResponse(response)
  }


}