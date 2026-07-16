import { IDeleteUserPlantRequest } from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class DeleteUserPlantRequestDto implements IDeleteUserPlantRequest {
  @IsNotEmpty()
  @IsUUID()
  userPlantId: string

  @IsNotEmpty()
  @IsUUID()
  userId: string
}