export interface IPlantType {
  plantTypeId: string
  bioName: string
  name: string
  wateringFrequency: number
  temperaturePreference: string
  lightPreference: string
  description: string
  image?: string
}

export interface ICreatePlantTypeRequest {
  bioName: string
  name: string
  wateringFrequency: number
  temperaturePreference: string
  lightPreference: string
  description: string
}

export interface IUpdatePlantTypeRequest {
  bioName: string
  name: string
  wateringFrequency: number
  temperaturePreference: string
  lightPreference: string
  description: string
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

