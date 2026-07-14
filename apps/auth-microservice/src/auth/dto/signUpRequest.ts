import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ISignUpRequest } from '@app/types/auth'

export class SignUpRequest implements ISignUpRequest {
  @IsNotEmpty()
  @IsString()
  login: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string

  @IsNotEmpty()
  @IsString()
  name: string
}