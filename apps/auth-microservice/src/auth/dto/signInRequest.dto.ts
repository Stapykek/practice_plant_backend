import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ISignInRequest } from '@app/types/auth'

export class SignInRequestDto implements ISignInRequest {
  @IsNotEmpty()
  @IsString()
  login: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string
}