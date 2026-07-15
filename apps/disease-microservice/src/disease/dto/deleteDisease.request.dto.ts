import { IDeleteDiseaseRequest } from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class DeleteDiseaseRequestDto implements IDeleteDiseaseRequest {
  @IsNotEmpty()
  @IsUUID()
  diseaseId: string
}