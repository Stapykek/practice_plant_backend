import { IGetPlantTypeRequest } from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class GetPlantTypeRequestDto implements IGetPlantTypeRequest {
  @IsNotEmpty()
  @IsUUID()
  plantTypeId: string
}