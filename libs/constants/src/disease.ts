import { IDisease } from '@app/types'

export const DiseaseSubject = {
  GET_DISEASE: 'getDisease',
  GET_DISEASES: 'getDiseases',
  GET_DISEASES_COUNT: 'getDiseasesCount',
  CREATE_DISEASE: 'createDisease',
  UPDATE_DISEASE: 'updateDisease',
  DELETE_DISEASE: 'deleteDisease'
}

export const DiseaseExample: IDisease = {
  diseaseId: '24cfe697-d70a-4375-879d-623e2537a2b4',
  name: 'Пересушено',
  treatment: '1. Обильный грамотный полив. Сделать это нужно грамотно. Ведь если земля очень сухая, то она отходит от стенок кашпо, образуя щели между землей и горшком. Поэтому если будет лить воду просто сверху, то она попадет в эти щели, а земля останется сухой.' +
    'Так что просто погрузите горшок с растением в воду целиком, пока пузырьки воздуха не перестанут подниматься. Это можно сделать в большом тазу или даже в наполненной ванной. После этого нужно слить лишнюю воду, иначе после высыхания растение будет ждать другая неприятная крайность — переувлажнение.'
}