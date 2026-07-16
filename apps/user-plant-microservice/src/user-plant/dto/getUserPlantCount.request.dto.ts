import { IGetUserPlantCountRequest } from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class GetUserPlantCountRequestDto implements IGetUserPlantCountRequest {
  @IsNotEmpty()
  @IsUUID()
  userId: string
}