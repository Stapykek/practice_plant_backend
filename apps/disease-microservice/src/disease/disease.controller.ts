import { Controller } from '@nestjs/common'
import { DiseaseService } from './disease.service'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { DiseaseSubject } from '@app/constants'
import * as DTO from './dto'
import { CountResponse, CreateDiseaseResponse, DeleteDiseaseResponse, GetDiseaseResponse, GetDiseasesResponse, UpdateDiseaseResponse } from '@app/types'

@Controller()
export class DiseaseController {
  constructor (
    private readonly diseaseService: DiseaseService
  ) {}

  @MessagePattern({cmd: DiseaseSubject.GET_DISEASE})
  async getDisease(@Payload() payload: DTO.GetDiseaseRequestDto): Promise<GetDiseaseResponse> {
    return this.diseaseService.getDisease(payload)
  }

  @MessagePattern({cmd: DiseaseSubject.GET_DISEASES_COUNT})
  async getDiseasesCount(): Promise<CountResponse> {
    return this.diseaseService.getDiseasesCount()
  }

  @MessagePattern({cmd: DiseaseSubject.GET_DISEASES})
  async getDiseases(@Payload() payload: DTO.GetDiseasesRequestDto): Promise<GetDiseasesResponse> {
    return this.diseaseService.getDiseases(payload)
  }

  @MessagePattern({cmd: DiseaseSubject.CREATE_DISEASE})
  async createDisease(@Payload() payload: DTO.CreateDiseaseRequestDto): Promise<CreateDiseaseResponse> {
    return this.diseaseService.createDisease(payload)
  }

  @MessagePattern({cmd: DiseaseSubject.UPDATE_DISEASE})
  async updateDisease(@Payload() payload: DTO.UpdateDiseaseRequestDto): Promise<UpdateDiseaseResponse> {
    return this.diseaseService.updateDisease(payload)
  }

  @MessagePattern({cmd: DiseaseSubject.DELETE_DISEASE})
  async deleteDisease(@Payload() payload: DTO.DeleteDiseaseRequestDto): Promise<DeleteDiseaseResponse> {
    return this.diseaseService.deleteDisease(payload)
  }
}