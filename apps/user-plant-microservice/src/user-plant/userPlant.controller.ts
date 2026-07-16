import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { UserPlantSubject } from '@app/constants'
import * as DTO from './dto'
import {
  CountResponse,
  CreateUserPlantResponse,
  DeleteUserPlantImageResponse,
  DeleteUserPlantResponse,
  GetUserPlantResponse,
  GetUserPlantsResponse,
  UpdateUserPlantResponse,
} from '@app/types'
import { UserPlantService } from './userPlant.service'
import { deleteFileByRelativeUrl, isErrorResponse } from '@app/utils'

@Controller()
export class UserPlantController {
  constructor(private readonly userPlantService: UserPlantService) {
  }

  @MessagePattern({cmd: UserPlantSubject.GET_USER_PLANT})
  async getUserPlant(@Payload() payload: DTO.GetUserPlantRequestDto): Promise<GetUserPlantResponse> {
    return this.userPlantService.get(payload)
  }
  
  @MessagePattern({cmd: UserPlantSubject.GET_USER_PLANTS})
  async getUserPlants(@Payload() payload: DTO.GetUserPlantsRequestDto): Promise<GetUserPlantsResponse> {
    return this.userPlantService.getMany(payload)
  }
  
  @MessagePattern({cmd: UserPlantSubject.GET_USER_PLANT_COUNT})
  async getUserPlantCount(@Payload() payload: DTO.GetUserPlantCountRequestDto): Promise<CountResponse> {
    return this.userPlantService.getCount(payload)
  }

  @MessagePattern({cmd: UserPlantSubject.CREATE_USER_PLANT})
  async createUserPlant(@Payload() payload: DTO.CreateUserPlantRequestDto): Promise<CreateUserPlantResponse> {
    const response = await this.userPlantService.create(payload)
    if (payload.image != null && isErrorResponse(response)) {
      deleteFileByRelativeUrl(payload.image)
    }
    return response
  }

  @MessagePattern({cmd: UserPlantSubject.UPDATE_USER_PLANT})
  async updateUserPlant(@Payload() payload: DTO.UpdateUserPlantRequestDto): Promise<UpdateUserPlantResponse> {
    const response = await this.userPlantService.update(payload)
    if (payload.image != null && isErrorResponse(response)) {
      console.log("shall delete ", payload.image)
      deleteFileByRelativeUrl(payload.image)
    }
    return response
  }

  @MessagePattern({cmd: UserPlantSubject.DELETE_USER_PLANT})
  async deleteUserPlant(@Payload() payload: DTO.DeleteUserPlantRequestDto): Promise<DeleteUserPlantResponse> {
    return this.userPlantService.delete(payload)
  }

  @MessagePattern({cmd: UserPlantSubject.DELETE_USER_PLANT_IMAGE})
  async deleteUserPlantImage(@Payload() payload: DTO.DeleteUserPlantImageRequestDto): Promise<DeleteUserPlantImageResponse> {
    return this.userPlantService.deleteImage(payload)
  }
}