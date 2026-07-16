import { ICreatePlantTypeRequest } from '@app/types'
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PlantTypeExample } from '@app/constants'

export class CreatePlantTypeRequestDto implements ICreatePlantTypeRequest {
  @ApiProperty({
    type: 'string',
    name: 'bioName',
    maxLength: 256,
    example: PlantTypeExample.bioName,
    required: true
  })
  @IsNotEmpty()
  @MaxLength(256)
  @IsString()
  bioName: string

  @ApiProperty({
    type: 'string',
    name: 'name',
    maxLength: 256,
    example: PlantTypeExample.name,
    required: true,
  })
  @IsNotEmpty()
  @MaxLength(256)
  @IsString()
  name: string

  @ApiProperty({
    type: 'integer',
    name: 'wateringFrequency',
    required: true,
    example: PlantTypeExample.wateringFrequency,
  })
  @IsNotEmpty()
  @IsInt()
  wateringFrequency: number

  @ApiProperty({
    type: 'string',
    name: 'temperaturePreference',
    maxLength: 256,
    required: true,
    example: PlantTypeExample.temperaturePreference,
  })
  @IsNotEmpty()
  @MaxLength(256)
  @IsString()
  temperaturePreference: string

  @ApiProperty({
    type: 'string',
    name: 'lightPreference',
    maxLength: 256,
    required: true,
    example: PlantTypeExample.lightPreference,
  })
  @IsNotEmpty()
  @MaxLength(256)
  @IsString()
  lightPreference: string

  @ApiProperty({
    type: 'string',
    name: 'description',
    required: true,
    example: PlantTypeExample.description,
  })
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiProperty({
    type: 'file',
    required: false,
  })
  file?: any
}