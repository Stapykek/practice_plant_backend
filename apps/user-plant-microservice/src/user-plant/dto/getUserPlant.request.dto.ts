import { IGetUserPlantRequest } from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class GetUserPlantRequestDto implements IGetUserPlantRequest {
  @IsNotEmpty()
  @IsUUID()
  userPlantId: string

  @IsNotEmpty()
  @IsUUID()
  userId: string
}