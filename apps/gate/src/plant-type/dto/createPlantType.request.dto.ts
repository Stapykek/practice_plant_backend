import { ICreatePlantTypeRequest } from '@app/types'
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreatePlantTypeRequestDto implements ICreatePlantTypeRequest {
  @ApiProperty({
    type: 'string',
    name: 'bioName',
    maxLength: 256,
    example: 'zamioculcas zamiifolia',
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
    example: 'Замиокулькас',
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
    example: 7,
  })
  @IsNotEmpty()
  @IsInt()
  wateringFrequency: number

  @ApiProperty({
    type: 'string',
    name: 'temperaturePreference',
    maxLength: 256,
    required: true,
    example: `Летом: от 20 до 26°C
    Зимой: от 16 до 18°C
    Критический минимум: 12-15°C`,
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
    example: `Предпочитает яркий рассеяный свет, однако летом лучше беречь от прямых солнечных лучей.`,
  })
  @IsNotEmpty()
  @MaxLength(256)
  @IsString()
  lightPreference: string

  @ApiProperty({
    type: 'string',
    name: 'description',
    required: true,
    example: `Долларовое дерево, или замиокулькас, — это вечнозеленое тропическое растение родом из Восточной Африки. Его используют как комнатное в разных уголках мира.`,
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