import { IGetDiseasesRequest } from '@app/types'
import { IsInt, IsNotEmpty, Min } from 'class-validator'

export class GetDiseasesRequestDto implements IGetDiseasesRequest {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  count: number

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  page: number
}