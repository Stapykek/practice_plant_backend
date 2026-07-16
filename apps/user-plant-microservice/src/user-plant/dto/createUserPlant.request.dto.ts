import { ICreateUserPlantRequest } from '@app/types'
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateUserPlantRequestDto implements ICreateUserPlantRequest {
  @IsNotEmpty()
  @IsUUID()
  userId: string

  @IsNotEmpty()
  @IsUUID()
  plantTypeId: string

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  wateredAt: Date

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  plantedAt: Date

  @IsNotEmpty()
  @IsString()
  nickname: string

  @IsOptional()
  @IsString()
  image?: string
}