import { ISuccessResponse, ServiceResponse } from '@app/types/response'

export interface IPlantType {
  plantTypeId: string
  bioName: string
  name: string
  wateringFrequency: number
  temperaturePreference: string
  lightPreference: string
  description: string
  image?: string | null
}

export interface ICreatePlantTypeRequest {
  bioName: string
  name: string
  wateringFrequency: number
  temperaturePreference: string
  lightPreference: string
  description: string
  image?: string | null
}

export interface IUpdatePlantTypeRequest {
  plantTypeId: string
  bioName?: string
  name?: string
  wateringFrequency?: number
  temperaturePreference?: string
  lightPreference?: string
  description?: string
  image?: string | null
}

export interface IGetPlantTypeRequest {
  plantTypeId: string
}

export interface IGetPlantTypesRequest {
  count: number
  page: number
}

export interface IDeletePlantTypeRequest {
  plantTypeId: string
}

export interface IDeletePlantTypeImageRequest {
  plantTypeId: string
}

export type ICreatePlantTypeResponse = IPlantType

export type IUpdatePlantTypeResponse = IPlantType

export type IGetPlantTypeResponse = IPlantType

export interface IGetPlantTypesResponse {
  items: IPlantType[]
  count: number
}

export type IDeletePlantTypeResponse = ISuccessResponse

export type IDeletePlantTypeImageResponse = ISuccessResponse

export type CreatePlantTypeResponse = ServiceResponse<ICreatePlantTypeResponse>
export type UpdatePlantTypeResponse = ServiceResponse<IUpdatePlantTypeResponse>
export type DeletePlantTypeResponse = ServiceResponse<IDeletePlantTypeResponse>
export type DeletePlantTypeImageResponse = ServiceResponse<IDeletePlantTypeImageResponse>
export type GetPlantTypeResponse = ServiceResponse<IGetPlantTypeResponse>
export type GetPlantTypesResponse = ServiceResponse<IGetPlantTypesResponse>


