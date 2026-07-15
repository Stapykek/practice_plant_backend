import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices'
import { AuthSubject } from '@app/constants'
import * as DTO from './dto'
import { SignInResponse, SignUpResponse } from '@app/types/auth'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({cmd: AuthSubject.SIGN_IN})
  async signIn(@Payload() payload: DTO.SignInRequestDto): Promise<SignInResponse>{
    return this.authService.signIn(payload)
  }

  @MessagePattern({cmd: AuthSubject.SIGN_UP_ADMIN})
  async signUpAdmin(@Payload() payload: DTO.SignUpRequestDto): Promise<SignUpResponse>{
    return this.authService.signUpAdmin(payload)
  }

  @MessagePattern({cmd: AuthSubject.SIGN_UP_STANDARD})
  async signUpStandard(@Payload() payload: DTO.SignUpRequestDto): Promise<SignUpResponse>{
    return this.authService.signUpStandard(payload)
  }
}
