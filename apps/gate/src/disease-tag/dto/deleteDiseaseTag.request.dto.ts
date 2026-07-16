import { IDeleteDiseaseTagRequest } from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { DiseaseTagExample } from '@app/constants/diseaseTag'

export class DeleteDiseaseTagRequestDto implements Omit<IDeleteDiseaseTagRequest, 'userId'> {

  @ApiProperty({
    type: 'string',
    name: 'userPlantId',
    required: true,
    example: DiseaseTagExample.userPlantId
  })
  @IsNotEmpty()
  @IsUUID()
  userPlantId: string

  @ApiProperty({
    type: 'string',
    name: 'diseaseId',
    required: true,
    example: DiseaseTagExample.diseaseId
  })
  @IsNotEmpty()
  @IsUUID()
  diseaseId: string
}