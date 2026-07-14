import {
  IUpdateUserRequest,
} from '@app/types/user'
import {
  IsNotEmpty,
  IsString,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserRequestDto implements Omit<IUpdateUserRequest, 'userId'> {
  @ApiProperty({
    name: 'name',
    required: true,
    type: 'string',
    example: 'НеАндрей',
  })
  @IsNotEmpty()
  @IsString()
  name: string
}