export interface IDiseaseTag {
  userPlantId: string
  diseaseId: string
}

export interface ICreateDiseaseTagRequest {
  userPlantId: string
  diseaseId: string
}

export interface IGetDiseaseTagsRequest {
  userPlantId: string
}

export interface IDeleteDiseaseTagRequest {
  userPlantId: string
  diseaseId: string
}

