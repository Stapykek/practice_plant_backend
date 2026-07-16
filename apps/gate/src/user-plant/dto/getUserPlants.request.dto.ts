import { IGetUserPlantsRequest } from '@app/types'
import { IsInt, IsNotEmpty, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GetUserPlantsRequestDto implements Omit<IGetUserPlantsRequest, 'userId'> {
  @ApiProperty({
    type: 'integer',
    name: 'page',
    required: true,
    example: 1,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  page: number

  @ApiProperty({
    type: 'integer',
    name: 'count',
    required: true,
    example: 1,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  count: number
}