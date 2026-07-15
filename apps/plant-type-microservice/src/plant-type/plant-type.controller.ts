import { Controller } from '@nestjs/common'
import { PlantTypeService } from './plant-type.service'
import * as DTO from './dto'
import {
  CountResponse,
  CreatePlantTypeResponse,
  DeletePlantTypeResponse,
  GetPlantTypeResponse,
  GetPlantTypesResponse,
  UpdatePlantTypeResponse,
} from '@app/types'
import { PlantTypeSubject } from '@app/constants'
import { MessagePattern } from '@nestjs/microservices'

@Controller()
export class PlantTypeController {
  constructor(private readonly plantTypeService: PlantTypeService) {}

  @MessagePattern({cmd: PlantTypeSubject.GET_PLANT_TYPE})
  async getPlantType(request: DTO.GetPlantTypeRequestDto): Promise<GetPlantTypeResponse> {
    return await this.plantTypeService.get(request)
  }

  @MessagePattern({cmd: PlantTypeSubject.GET_PLANT_TYPES})
  async getPlantTypes(request: DTO.GetPlantTypesRequestDto): Promise<GetPlantTypesResponse> {
    return await this.plantTypeService.getMany(request)
  }

  @MessagePattern({cmd: PlantTypeSubject.GET_PLANT_TYPE_COUNT})
  async getPlantTypeCount(): Promise<CountResponse> {
    return await this.plantTypeService.getCount()
  }
  
  @MessagePattern({cmd: PlantTypeSubject.CREATE_PLANT_TYPE})
  async createPlantType(request: DTO.CreatePlantTypeRequestDto): Promise<CreatePlantTypeResponse> {
    return await this.plantTypeService.create(request)
  }

  @MessagePattern({cmd: PlantTypeSubject.UPDATE_PLANT_TYPE})
  async updatePlantType(request: DTO.UpdatePlantTypeRequestDto): Promise<UpdatePlantTypeResponse> {
    return await this.plantTypeService.update(request)
  }

  @MessagePattern({cmd: PlantTypeSubject.DELETE_PLANT_TYPE})
  async deletePlantType(request: DTO.DeletePlantTypeRequestDto): Promise<DeletePlantTypeResponse> {
    return await this.plantTypeService.delete(request)
  }

}