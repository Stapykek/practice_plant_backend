import { Injectable } from '@nestjs/common'
import {
  ISignInRequest,
  ISignUpRequest,
  SignInResponse,
  SignUpResponse,
} from '@app/types/auth'
import { UserService } from '../../../user-microservice/src/user/user.service'
import * as bcrypt from 'bcrypt'
import { isErrorResponse } from '@app/utils'
import { AuthError } from '@app/errors'
import { ICreateUserResponse, IUser, UserRole } from '@app/types'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(request: ISignInRequest): Promise<SignInResponse> {
    const { login, password } = request
    const foundUser = await this.userService.findOne({ login })

    if (!foundUser || isErrorResponse(foundUser)) {
      return AuthError.INCORRECT_CREDENTIALS
    }

    const user = foundUser as IUser

    if (!(await bcrypt.compare(password, user.password))) {
      return AuthError.INCORRECT_CREDENTIALS
    }

    const jwt_payload = { userId: user.userId, login: user.login, userRole: user.userRole }

    return { token: await this.jwtService.signAsync(jwt_payload) }
  }

  private async _signUp(
    request: ISignUpRequest,
    userRole: UserRole,
  ): Promise<SignUpResponse> {
    const { login, name, password } = request
    const hash = await bcrypt.hash(password, 5)
    const createResult = await this.userService.create({
      login,
      name,
      password: hash,
      userRole,
    })

    if (!createResult || isErrorResponse(createResult)) {
      return AuthError.FORBIDDEN
    }

    const result = createResult as ICreateUserResponse

    return result
  }

  async signUpStandard(request: ISignUpRequest): Promise<SignUpResponse> {
    return this._signUp(request, UserRole.STANDARD)
  }

  async signUpAdmin(request: ISignUpRequest): Promise<SignUpResponse> {
    return this._signUp(request, UserRole.ADMIN)
  }
}
