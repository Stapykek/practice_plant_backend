import { IDiseaseTag } from '@app/types'
import { UserPlantExample } from '@app/constants/userPlant'
import { DiseaseExample } from '@app/constants/disease'

export const DiseaseTagSubject = {
  GET_DISEASE_TAGS: 'getDiseaseTags',
  CREATE_DISEASE_TAG: 'createDiseaseTag',
  DELETE_DISEASE_TAG: 'deleteDiseaseTag'
}

export const DiseaseTagExample: IDiseaseTag = {
  userPlantId: UserPlantExample.userPlantId,
  diseaseId: DiseaseExample.diseaseId
}

export const MAX_DISEASE_TAGS_ON_PLANT = 10