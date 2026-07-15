import { IGetPlantTypesRequest } from '@app/types'
import { IsInt, IsNotEmpty, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GetPlantTypesRequestDto implements IGetPlantTypesRequest {
  @ApiProperty({
    type: "integer",
    name: 'count',
    example: 5,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  count: number

  @ApiProperty({
    type: "integer",
    name: 'page',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  page: number
}