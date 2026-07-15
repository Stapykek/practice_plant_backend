import { ICreateDiseaseRequest } from '@app/types'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateDiseaseRequestDto implements ICreateDiseaseRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string

  @IsNotEmpty()
  @IsString()
  treatment: string
}