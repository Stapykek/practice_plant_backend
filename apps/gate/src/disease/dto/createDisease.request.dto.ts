import { ICreateDiseaseRequest } from '@app/types'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { DiseaseExample } from '@app/constants'

export class CreateDiseaseRequestDto implements ICreateDiseaseRequest {
  @ApiProperty({
    type: 'string',
    name: 'name',
    required: true,
    maxLength: 256,
    example: DiseaseExample.name
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string

  @ApiProperty({
    type: 'string',
    name: 'displayName',
    required: true,
    maxLength: 256,
    example: DiseaseExample.displayName
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  displayName: string

  @ApiProperty({
    type: 'string',
    name: 'treatment',
    required: true,
    example: DiseaseExample.treatment
  })
  @IsNotEmpty()
  @IsString()
  treatment: string
}