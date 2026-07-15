import { ICreatePlantTypeRequest } from '@app/types'
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreatePlantTypeRequestDto implements ICreatePlantTypeRequest {
  @IsNotEmpty()
  @IsString()
  bioName: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsInt()
  wateringFrequency: number

  @IsNotEmpty()
  @IsString()
  temperaturePreference: string

  @IsNotEmpty()
  @IsString()
  lightPreference: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsOptional()
  @IsString()
  image?: string
}