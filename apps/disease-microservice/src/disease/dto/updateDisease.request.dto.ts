import {
  IUpdateDiseaseRequest,
} from '@app/types'
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator'

export class UpdateDiseaseRequestDto implements IUpdateDiseaseRequest {
  @IsNotEmpty()
  @IsUUID()
  diseaseId: string

  @IsOptional()
  @IsString()
  @MaxLength(256)
  name?: string

  @IsOptional()
  @IsString()
  @MaxLength(256)
  displayName?: string

  @IsOptional()
  @IsString()
  treatment?: string
}