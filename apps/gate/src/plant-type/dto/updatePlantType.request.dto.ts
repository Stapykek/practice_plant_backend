import { IUpdatePlantTypeRequest } from '@app/types'
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdatePlantTypeRequestDto implements IUpdatePlantTypeRequest {
  @ApiProperty({
    type: 'string',
    name: 'plantTypeId',
    example: '0f48ebeb-3a21-4c10-8a5d-9df4e1f4e658',
    required: true
  })
  @IsNotEmpty()
  @IsUUID()
  plantTypeId: string

  @ApiProperty({
    type: 'string',
    name: 'bioName',
    maxLength: 256,
    example: 'zamioculcas zamiifolia',
    required: false
  })
  @IsOptional()
  @IsString()
  bioName?: string

  @ApiProperty({
    type: 'string',
    name: 'name',
    maxLength: 256,
    example: 'Замиокулькас',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({
    type: 'integer',
    name: 'wateringFrequency',
    required: false,
    example: 7,
  })
  @IsOptional()
  @IsInt()
  wateringFrequency?: number

  @ApiProperty({
    type: 'string',
    name: 'temperaturePreference',
    maxLength: 256,
    required: false,
    example: `Летом: от 20 до 26°C
    Зимой: от 16 до 18°C
    Критический минимум: 12-15°C`,
  })
  @IsOptional()
  @IsString()
  temperaturePreference?: string

  @ApiProperty({
    type: 'string',
    name: 'lightPreference',
    maxLength: 256,
    required: false,
    example: `Предпочитает яркий рассеяный свет, однако летом лучше беречь от прямых солнечных лучей.`,
  })
  @IsOptional()
  @IsString()
  lightPreference?: string

  @ApiProperty({
    type: 'string',
    name: 'description',
    required: false,
    example: `Долларовое дерево, или замиокулькас, — это вечнозеленое тропическое растение родом из Восточной Африки. Его используют как комнатное в разных уголках мира.`,
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