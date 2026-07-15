import { IGetDiseaseRequest } from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { DiseaseExample } from '@app/constants'

export class GetDiseaseRequestDto implements IGetDiseaseRequest {
  @ApiProperty({
    type: 'string',
    name: 'diseaseId',
    required: true,
    example: DiseaseExample.diseaseId
  })
  @IsNotEmpty()
  @IsUUID()
  diseaseId: string
}