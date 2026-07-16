import { IGetDiseaseTagsRequest } from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class GetDiseaseTagsRequestDto implements IGetDiseaseTagsRequest {
  @IsNotEmpty()
  @IsUUID()
  userId: string

  @IsNotEmpty()
  @IsUUID()
  userPlantId: string
}