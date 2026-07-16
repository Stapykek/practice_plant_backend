import {
  IDeleteUserPlantImageRequest
} from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class DeleteUserPlantImageRequestDto implements IDeleteUserPlantImageRequest {
  @IsNotEmpty()
  @IsUUID()
  userPlantId: string

  @IsNotEmpty()
  @IsUUID()
  userId: string
}