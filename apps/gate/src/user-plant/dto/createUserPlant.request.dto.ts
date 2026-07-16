import { ICreateUserPlantRequest } from '@app/types'
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { PlantTypeExample, UserPlantExample } from '@app/constants'

export class CreateUserPlantRequestDto implements Omit<ICreateUserPlantRequest, 'userId' | 'image'> {
  @ApiProperty({
    type: 'string',
    name: 'plantTypeId',
    required: true,
    example: PlantTypeExample.plantTypeId,
  })
  @IsNotEmpty()
  @IsUUID()
  plantTypeId: string

  @ApiProperty({
    type: 'string',
    format: 'date',
    name: 'wateredAt',
    required: true,
    example: UserPlantExample.wateredAt,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  wateredAt: Date

  @ApiProperty({
    type: 'string',
    format: 'date',
    name: 'plantedAt',
    required: true,
    example: UserPlantExample.plantedAt,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  plantedAt: Date

  @ApiProperty({
    type: 'string',
    name: 'nickname',
    required: true,
    example: UserPlantExample.nickname,
  })
  @IsNotEmpty()
  @IsString()
  nickname: string

  @ApiProperty({
    type: "string",
    format: 'binary',
    required: false,
  })
  file?: string
}