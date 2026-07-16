import { IGetPlantTypeRequest } from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PlantTypeExample } from '@app/constants'

export class GetPlantTypeRequestDto implements IGetPlantTypeRequest {
  @ApiProperty({
    type: 'string',
    name: 'plantTypeId',
    example: PlantTypeExample.plantTypeId,
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  plantTypeId: string
}