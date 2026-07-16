import { IUpdateUserPlantRequest } from '@app/types'
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { UserPlantExample } from '@app/constants'

export class UpdateUserPlantRequestDto implements Omit<IUpdateUserPlantRequest, 'userId' | 'image'> {
  @ApiProperty({
    type: 'string',
    name: 'userPlantId',
    required: true,
    example: UserPlantExample.userPlantId,
  })
  @IsNotEmpty()
  @IsUUID()
  userPlantId: string

  @ApiProperty({
    type: 'string',
    format: 'date',
    name: 'wateredAt',
    required: false,
    example: UserPlantExample.wateredAt,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  wateredAt: Date

  @ApiProperty({
    type: 'string',
    format: 'date',
    name: 'plantedAt',
    required: false,
    example: UserPlantExample.plantedAt,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  plantedAt: Date

  @ApiProperty({
    type: 'string',
    name: 'nickname',
    required: false,
    example: UserPlantExample.nickname,
  })
  @IsOptional()
  @IsString()
  nickname: string

  @ApiProperty({
    type: 'file',
    required: false,
  })
  file?: any
}