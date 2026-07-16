import { IUpdatePlantTypeRequest } from '@app/types'
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PlantTypeExample } from '@app/constants'

export class UpdatePlantTypeRequestDto implements IUpdatePlantTypeRequest {
  @ApiProperty({
    type: 'string',
    name: 'plantTypeId',
    example: PlantTypeExample.plantTypeId,
    required: true
  })
  @IsNotEmpty()
  @IsUUID()
  plantTypeId: string

  @ApiProperty({
    type: 'string',
    name: 'bioName',
    maxLength: 256,
    example: PlantTypeExample.bioName,
    required: false
  })
  @IsOptional()
  @IsString()
  bioName?: string

  @ApiProperty({
    type: 'string',
    name: 'name',
    maxLength: 256,
    example: PlantTypeExample.name,
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({
    type: 'integer',
    name: 'wateringFrequency',
    required: false,
    example: PlantTypeExample.wateringFrequency,
  })
  @IsOptional()
  @IsInt()
  wateringFrequency?: number

  @ApiProperty({
    type: 'string',
    name: 'temperaturePreference',
    maxLength: 256,
    required: false,
    example: PlantTypeExample.temperaturePreference,
  })
  @IsOptional()
  @IsString()
  temperaturePreference?: string

  @ApiProperty({
    type: 'string',
    name: 'lightPreference',
    maxLength: 256,
    required: false,
    example: PlantTypeExample.lightPreference,
  })
  @IsOptional()
  @IsString()
  lightPreference?: string

  @ApiProperty({
    type: 'string',
    name: 'description',
    required: false,
    example: PlantTypeExample.description,
  })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({
    type: 'file',
    required: false,
  })
  file?: any
}