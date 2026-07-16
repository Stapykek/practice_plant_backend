import { ISuccessResponse, ServiceResponse } from '@app/types/response'

export interface IDiseaseTag {
  userPlantId: string
  diseaseId: string
}

export interface ICreateDiseaseTagRequest {
  userId: string
  userPlantId: string
  diseaseId: string
}

export interface IGetDiseaseTagsRequest {
  userId: string
  userPlantId: string
}

export interface IDeleteDiseaseTagRequest {
  userId: string
  userPlantId: string
  diseaseId: string
}

export type ICreateDiseaseTagResponse = IDiseaseTag
export interface IGetDiseaseTagsResponse {
  items: IDiseaseTag[]
  count: number
}

export type IDeleteDiseaseTagResponse = ISuccessResponse

export type GetDiseaseTagsResponse = ServiceResponse<IGetDiseaseTagsResponse>
export type CreateDiseaseTagResponse = ServiceResponse<ICreateDiseaseTagResponse>
export type DeleteDiseaseTagResponse = ServiceResponse<IDeleteDiseaseTagResponse>