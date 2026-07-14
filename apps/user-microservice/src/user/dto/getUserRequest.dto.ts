import { IGetUserRequest } from '@app/types/user'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class GetUserRequestDto implements IGetUserRequest {
  @IsUUID()
  @IsNotEmpty()
  userId: string
}