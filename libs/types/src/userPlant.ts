export interface IUserPlant {
  userPlantId: string
  userId: string
  plantTypeId: string
  wateredAt: Date
  plantedAt: Date
  nickname: string
  image?: string
}

export interface ICreateUserPlantRequest {
  plantTypeId: string
  wateredAt: Date
  plantedAt: Date
  nickname: string
}

export interface IUpdateUserPlantRequest {
  userPlantId: string
  wateredAt?: Date
  plantedAt?: Date
  nickname?: string
}

export interface IGetUserPlantRequest {
  plantTypeId: string
}

export interface IGetUserPlantsRequest {
  page: number
  count: number
}

export interface IDeleteUserPlantRequest {
  userPlantId: string
}

