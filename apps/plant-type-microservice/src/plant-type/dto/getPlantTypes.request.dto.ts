import { IGetPlantTypesRequest } from '@app/types'
import { IsInt, IsNotEmpty, Min } from 'class-validator'

export class GetPlantTypesRequestDto implements IGetPlantTypesRequest {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  count: number

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  page: number
}