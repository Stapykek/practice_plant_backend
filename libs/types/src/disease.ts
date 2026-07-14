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
  name?: string
  treatment?: string
}

export interface IGetDiseaseRequest {
  diseaseId: string
}

export interface IGetDiseaseByNameRequest {
  name: string
}

export interface IGetDiseasesRequest {
  count: number
  page: number
}

export interface IDeleteDiseaseRequest {
  diseaseId: string
}

