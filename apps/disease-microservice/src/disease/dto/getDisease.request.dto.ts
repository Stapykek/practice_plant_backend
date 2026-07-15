import { IGetDiseaseRequest } from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class GetDiseaseRequestDto implements IGetDiseaseRequest {
  @IsNotEmpty()
  @IsUUID()
  diseaseId: string
}