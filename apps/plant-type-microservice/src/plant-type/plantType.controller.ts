import { Controller } from '@nestjs/common'
import { PlantTypeService } from './plantType.service'
import * as DTO from './dto'
import {
  CountResponse,
  CreatePlantTypeResponse,
  DeletePlantTypeImageResponse,
  DeletePlantTypeResponse,
  GetPlantTypeResponse,
  GetPlantTypesResponse,
  UpdatePlantTypeResponse,
} from '@app/types'
import { PlantTypeSubject } from '@app/constants'
import { MessagePattern } from '@nestjs/microservices'
import { deleteFileByRelativeUrl, isErrorResponse } from '@app/utils'

@Controller()
export class PlantTypeController {
  constructor(private readonly plantTypeService: PlantTypeService) {}

  @MessagePattern({cmd: PlantTypeSubject.GET_PLANT_TYPE})
  async getPlantType(request: DTO.GetPlantTypeRequestDto): Promise<GetPlantTypeResponse> {
    return this.plantTypeService.get(request)
  }

  @MessagePattern({cmd: PlantTypeSubject.GET_PLANT_TYPES})
  async getPlantTypes(request: DTO.GetPlantTypesRequestDto): Promise<GetPlantTypesResponse> {
    return this.plantTypeService.getMany(request)
  }

  @MessagePattern({cmd: PlantTypeSubject.GET_PLANT_TYPE_COUNT})
  async getPlantTypeCount(): Promise<CountResponse> {
    return this.plantTypeService.getCount()
  }
  
  @MessagePattern({cmd: PlantTypeSubject.CREATE_PLANT_TYPE})
  async createPlantType(request: DTO.CreatePlantTypeRequestDto): Promise<CreatePlantTypeResponse> {
    const response = await this.plantTypeService.create(request)
    if (request.image != null && isErrorResponse(response)) {
      deleteFileByRelativeUrl(request.image)
    }
    return response
  }

  @MessagePattern({cmd: PlantTypeSubject.UPDATE_PLANT_TYPE})
  async updatePlantType(request: DTO.UpdatePlantTypeRequestDto): Promise<UpdatePlantTypeResponse> {
    const response = await this.plantTypeService.update(request)
    if (request.image != null && isErrorResponse(response)) {
      deleteFileByRelativeUrl(request.image)
    }
    return response
  }

  @MessagePattern({cmd: PlantTypeSubject.DELETE_PLANT_TYPE})
  async deletePlantType(request: DTO.DeletePlantTypeRequestDto): Promise<DeletePlantTypeResponse> {
    return this.plantTypeService.delete(request)
  }

  @MessagePattern({cmd: PlantTypeSubject.DELETE_PLANT_TYPE_IMAGE})
  async deletePlantTypeImage(request: DTO.DeletePlantTypeImageRequestDto): Promise<DeletePlantTypeImageResponse> {
    return this.plantTypeService.deleteImage(request)
  }

}