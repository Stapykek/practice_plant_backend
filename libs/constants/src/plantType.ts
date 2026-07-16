import { IPlantType } from '@app/types'

export const PlantTypeSubject = {
  GET_PLANT_TYPE: 'getPlantType',
  GET_PLANT_TYPES: 'getPlantTypes',
  GET_PLANT_TYPE_COUNT: 'getPlantTypeCount',
  CREATE_PLANT_TYPE: 'createPlantType',
  UPDATE_PLANT_TYPE: 'updatePlantType',
  DELETE_PLANT_TYPE: 'deletePlantType',
  DELETE_PLANT_TYPE_IMAGE: 'deletePlantTypeImage',
}

export const PlantTypeExample: IPlantType = {
  plantTypeId: '0f48ebeb-3a21-4c10-8a5d-9df4e1f4e658',
  bioName: 'zamioculcas zamiifolia',
  name: 'Замиокулькас',
  wateringFrequency: 7,
  temperaturePreference: `Летом: от 20 до 26°C
    Зимой: от 16 до 18°C
    Критический минимум: 12-15°C`,
  lightPreference: 'Предпочитает яркий рассеяный свет, однако летом лучше беречь от прямых солнечных лучей.',
  description: 'Долларовое дерево, или замиокулькас, — это вечнозеленое тропическое растение родом из Восточной Африки. Его используют как комнатное в разных уголках мира.'
}