import { ISuccessResponse, ServiceResponse } from '@app/types/response'

export interface IUserPlant {
  userPlantId: string
  userId: string
  plantTypeId: string
  wateredAt: Date
  plantedAt: Date
  nickname: string
  image?: string | null
}

export interface ICreateUserPlantRequest {
  userId: string
  plantTypeId: string
  wateredAt: Date
  plantedAt: Date
  nickname: string
  image?: string | null
}

export interface IUpdateUserPlantRequest {
  userId: string
  userPlantId: string
  wateredAt?: Date
  plantedAt?: Date
  nickname?: string
  image?: string | null
}

export interface IGetUserPlantRequest {
  userPlantId: string
  userId: string
}

export interface IGetUserPlantsRequest {
  userId: string
  page: number
  count: number
}

export interface IGetUserPlantCountRequest {
  userId: string
}

export interface IDeleteUserPlantRequest {
  userId: string
  userPlantId: string
}

export interface IDeleteUserPlantImageRequest {
  userId: string
  userPlantId: string
}

export type IGetUserPlantResponse = IUserPlant

export interface IGetUserPlantsResponse {
  items: IUserPlant[]
  count: number
}

export type ICreateUserPlantResponse = IUserPlant

export type IUpdateUserPlantResponse = IUserPlant

export type IDeleteUserPlantResponse = ISuccessResponse

export type IDeleteUserPlantImageResponse = ISuccessResponse

export type GetUserPlantResponse = ServiceResponse<IGetUserPlantResponse>
export type GetUserPlantsResponse = ServiceResponse<IGetUserPlantsResponse>
export type CreateUserPlantResponse = ServiceResponse<ICreateUserPlantResponse>
export type UpdateUserPlantResponse = ServiceResponse<IUpdateUserPlantResponse>
export type DeleteUserPlantResponse = ServiceResponse<IDeleteUserPlantResponse>
export type DeleteUserPlantImageResponse = ServiceResponse<IDeleteUserPlantImageResponse>
