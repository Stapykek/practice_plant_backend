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
import { ApiProperty } from '@nestjs/swagger'
import { DiseaseExample } from '@app/constants'

export class UpdateDiseaseRequestDto implements IUpdateDiseaseRequest {
  @ApiProperty({
    type: 'string',
    name: 'diseaseId',
    required: true,
    example: DiseaseExample.diseaseId
  })
  @IsNotEmpty()
  @IsUUID()
  diseaseId: string

  @ApiProperty({
    type: 'string',
    name: 'name',
    required: false,
    maxLength: 256,
    example: DiseaseExample.name
  })
  @IsOptional()
  @IsString()
  @MaxLength(256)
  name?: string

  @ApiProperty({
    type: 'string',
    name: 'name',
    required: false,
    maxLength: 256,
    example: DiseaseExample.displayName
  })
  @IsOptional()
  @IsString()
  @MaxLength(256)
  displayName?: string

  @ApiProperty({
    type: 'string',
    name: 'treatment',
    required: false,
    example: DiseaseExample.treatment
  })
  @IsOptional()
  @IsString()
  treatment?: string
}