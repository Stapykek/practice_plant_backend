import { IGetDiseasesRequest } from '@app/types'
import { IsInt, IsNotEmpty, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GetDiseasesRequestDto implements IGetDiseasesRequest {
  @ApiProperty({
    type: 'integer',
    name: 'count',
    required: true,
    minimum: 1,
    example: 1
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  count: number

  @ApiProperty({
    type: 'integer',
    name: 'page',
    required: true,
    minimum: 1,
    example: 1
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  page: number
}