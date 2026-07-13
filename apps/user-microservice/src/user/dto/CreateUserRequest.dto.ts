import { ICreateUserRequest } from '@app/types/user';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserRequestDto implements ICreateUserRequest {
  @IsNotEmpty()
  @IsString()
  login: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string
}