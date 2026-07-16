import {
  IDeleteUserPlantImageRequest
} from '@app/types'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { UserPlantExample } from '@app/constants'

export class DeleteUserPlantImageRequestDto implements Omit<IDeleteUserPlantImageRequest, 'userId'> {
  @ApiProperty({
    type: 'string',
    name: 'userPlantId',
    required: true,
    example: UserPlantExample.userPlantId,
  })
  @IsNotEmpty()
  @IsUUID()
  userPlantId: string
}