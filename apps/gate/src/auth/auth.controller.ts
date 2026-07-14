import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as DTO from './dto'
import { AuthSubject } from '@app/constants'
import { firstValueFrom } from 'rxjs'
import { handleServiceResponse } from '@app/utils'
import { Public } from '@app/infrastructure'
import { SignInResponse, SignUpResponse } from '@app/types/auth'
import { ApiTags } from '@nestjs/swagger'

@Public()
@ApiTags('AuthController')
@Controller('auth')
export class AuthController {

  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy
  ) {}

  @Post('/signup/admin')
  async signUpAdmin(@Body() body: DTO.SignUpRequest): Promise<SignUpResponse> {
    const response = await firstValueFrom(this.natsClient.send<SignUpResponse>({cmd: AuthSubject.SIGN_UP_ADMIN}, body))
    return handleServiceResponse(response)
  }

  @Post('/signup/standard')
  async signUpStandard(@Body() body: DTO.SignUpRequest): Promise<SignUpResponse>{
    const response = await firstValueFrom(this.natsClient.send<SignUpResponse>({cmd: AuthSubject.SIGN_UP_STANDARD}, body))
    return handleServiceResponse(response)
  }

  @Post('signin')
  async signIn(@Body() body: DTO.SignInRequest): Promise<SignInResponse> {
    const response = await firstValueFrom(this.natsClient.send<SignInResponse>({cmd: AuthSubject.SIGN_IN}, body))
    return handleServiceResponse(response)
  }


}