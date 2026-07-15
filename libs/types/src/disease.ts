import { ISuccessResponse, ServiceResponse } from '@app/types/response'

export interface IDisease {
  diseaseId: string
  name: string
  treatment: string
}

export interface ICreateDiseaseRequest {
  name: string
  treatment: string
}

export interface IUpdateDiseaseRequest {
  diseaseId: string
  name?: string
  treatment?: string
}

export interface IGetDiseaseRequest {
  diseaseId: string
}

export interface IGetDiseasesRequest {
  count: number
  page: number
}

export interface IDeleteDiseaseRequest {
  diseaseId: string
}

export interface IFindDiseaseRequest {
  name: string
}

export type ICreateDiseaseResponse = IDisease

export type IUpdateDiseaseResponse = IDisease

export type IGetDiseaseResponse = IDisease

export interface IGetDiseasesResponse {
  items: IDisease[]
  count: number
}

export type IDeleteDiseaseResponse = ISuccessResponse

export type CreateDiseaseResponse = ServiceResponse<ICreateDiseaseResponse>
export type UpdateDiseaseResponse = ServiceResponse<IUpdateDiseaseResponse>
export type GetDiseaseResponse = ServiceResponse<IGetDiseaseResponse>
export type GetDiseasesResponse = ServiceResponse<IGetDiseasesResponse>
export type DeleteDiseaseResponse = ServiceResponse<IDeleteDiseaseResponse>

