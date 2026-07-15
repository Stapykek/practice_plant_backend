import { IDeletePlantTypeRequest } from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class DeletePlantTypeRequestDto implements IDeletePlantTypeRequest {
  @ApiProperty({
    type: 'string',
    name: 'plantTypeId',
    required: true,
    example: '0f48ebeb-3a21-4c10-8a5d-9df4e1f4e658',
  })
  @IsNotEmpty()
  @IsUUID()
  plantTypeId: string
}