import { IDeletePlantTypeRequest } from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class DeletePlantTypeRequestDto implements IDeletePlantTypeRequest {
  @IsNotEmpty()
  @IsUUID()
  plantTypeId: string
}