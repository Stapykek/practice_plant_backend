import { IDeleteDiseaseTagRequest } from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class DeleteDiseaseTagRequestDto implements IDeleteDiseaseTagRequest {
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