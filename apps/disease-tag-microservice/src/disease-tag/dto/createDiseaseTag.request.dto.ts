import { ICreateDiseaseTagRequest } from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateDiseaseTagRequestDto implements ICreateDiseaseTagRequest {
  @IsNotEmpty()
  @IsUUID()
  userId: string

  @IsNotEmpty()
  @IsUUID()
  userPlantId: string

  @IsNotEmpty()
  @IsUUID()
  diseaseId: string
}