import { IGetDiseaseTagsRequest } from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { DiseaseTagExample } from '@app/constants/diseaseTag'

export class GetDiseaseTagsRequestDto implements Omit<IGetDiseaseTagsRequest, 'userId'> {
  @ApiProperty({
    type: 'string',
    name: 'userPlantId',
    required: true,
    example: DiseaseTagExample.userPlantId
  })
  @IsNotEmpty()
  @IsUUID()
  userPlantId: string
}