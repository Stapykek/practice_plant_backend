import { IGetUserPlantsRequest } from '@app/types'
import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator'

export class GetUserPlantsRequestDto implements IGetUserPlantsRequest {
  @IsNotEmpty()
  @IsUUID()
  userId: string

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  page: number

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  count: number
}