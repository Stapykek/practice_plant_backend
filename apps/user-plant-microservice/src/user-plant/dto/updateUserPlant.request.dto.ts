import { IUpdateUserPlantRequest } from '@app/types'
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'

export class UpdateUserPlantRequestDto implements IUpdateUserPlantRequest {
  @IsNotEmpty()
  @IsUUID()
  userPlantId: string

  @IsNotEmpty()
  @IsUUID()
  userId: string

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  wateredAt: Date

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  plantedAt: Date

  @IsOptional()
  @IsString()
  nickname: string

  @IsOptional()
  @IsString()
  image?: string
}