import {
  IDeletePlantTypeImageRequest,
} from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class DeletePlantTypeImageRequestDto implements IDeletePlantTypeImageRequest {
  @IsNotEmpty()
  @IsUUID()
  plantTypeId: string
}