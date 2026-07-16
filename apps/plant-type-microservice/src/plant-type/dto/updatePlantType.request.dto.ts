import { IUpdatePlantTypeRequest } from '@app/types'
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'

export class UpdatePlantTypeRequestDto implements IUpdatePlantTypeRequest {
  @IsNotEmpty()
  @IsUUID()
  plantTypeId: string
  
  @IsOptional()
  @IsString()
  bioName?: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsInt()
  wateringFrequency?: number

  @IsOptional()
  @IsString()
  temperaturePreference?: string

  @IsOptional()
  @IsString()
  lightPreference?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  image?: string | null
}