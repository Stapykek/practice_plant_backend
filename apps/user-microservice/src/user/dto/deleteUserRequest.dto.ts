import { IDeleteUserRequest } from '@app/types/user'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class DeleteUserRequestDto implements IDeleteUserRequest {
  @IsUUID()
  @IsNotEmpty()
  userId: string
}