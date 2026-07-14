import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ISignInRequest } from '@app/types/auth'
import { ApiProperty } from '@nestjs/swagger'

export class SignInRequest implements ISignInRequest {
  @ApiProperty(
    {
      name: 'login',
      type: 'string',
      required: true,
      example: 'andrew1337'
    }
  )
  @IsNotEmpty()
  @IsString()
  login: string

  @ApiProperty(
    {
      name: 'password',
      type: 'string',
      required: true,
      example: 'hspfeif123323'
    }
  )
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string
}