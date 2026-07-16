import {
  IDeletePlantTypeImageRequest,
} from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PlantTypeExample } from '@app/constants'

export class DeletePlantTypeImageRequestDto implements IDeletePlantTypeImageRequest {
  @ApiProperty({
    type: 'string',
    name: 'plantTypeId',
    required: true,
    example: PlantTypeExample.plantTypeId,
  })
  @IsNotEmpty()
  @IsUUID()
  plantTypeId: string
}