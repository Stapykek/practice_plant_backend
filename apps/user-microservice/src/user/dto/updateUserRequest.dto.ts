import {
  IUpdateUserRequest,
} from '@app/types/user'
import {
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator'

export class UpdateUserRequestDto implements IUpdateUserRequest {
  @IsNotEmpty()
  @IsUUID()
  userId: string

  @IsNotEmpty()
  @IsString()
  name: string
}