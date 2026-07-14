import { ICreateUserRequest, UserRole } from '@app/types/user';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserRequestDto implements ICreateUserRequest {
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

  @IsEnum(UserRole)
  userRole: UserRole
}