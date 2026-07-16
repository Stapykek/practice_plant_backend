import { IUserPlant } from '@app/types'
import { STATIC_SERVE_ROUTE } from '@app/constants/files'
import { UserExample } from '@app/constants/user'
import { PlantTypeExample } from '@app/constants/plantType'

export const UserPlantSubject = {
  GET_USER_PLANT: 'getUserPlant',
  GET_USER_PLANT_COUNT: 'getUserPlantCount',
  GET_USER_PLANTS: 'getUserPlants',
  CREATE_USER_PLANT: 'createUserPlant',
  UPDATE_USER_PLANT: 'updateUserPlant',
  DELETE_USER_PLANT: 'deleteUserPlant',
  DELETE_USER_PLANT_IMAGE: 'deleteUserPlantImage',
}

export const UserPlantExample: IUserPlant = {
  userPlantId: '62e5a86c-adf6-427d-b7c8-9478c4b96b6d',
  userId: UserExample.userId,
  plantTypeId: PlantTypeExample.plantTypeId,
  wateredAt: new Date("2026-07-16"),
  plantedAt: new Date("2025-06-02"),
  nickname: 'богатый ролокс',
  image: `http://127.0.0.1:3000/${STATIC_SERVE_ROUTE}/7e956a88-0bd2-44af-acf2-f57a9f2e7bbb-2026-7-16.jpg`,
}