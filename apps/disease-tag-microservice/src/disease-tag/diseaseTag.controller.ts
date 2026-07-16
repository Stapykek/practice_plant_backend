import { DiseaseTagService } from './diseaseTag.service'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { DiseaseTagSubject } from '@app/constants/diseaseTag'
import * as DTO from './dto'
import { CreateDiseaseTagResponse, DeleteDiseaseTagResponse, GetDiseaseTagsResponse } from '@app/types'
import { Controller } from '@nestjs/common'

@Controller()
export class DiseaseTagController {
  constructor(
    private readonly diseaseTagService: DiseaseTagService
  ) {}

  @MessagePattern({cmd: DiseaseTagSubject.GET_DISEASE_TAGS})
  async getDiseaseTags(@Payload() payload: DTO.GetDiseaseTagsRequestDto): Promise<GetDiseaseTagsResponse> {
    console.log('reqqq', payload)
    return this.diseaseTagService.getMany(payload)
  }

  @MessagePattern({cmd: DiseaseTagSubject.CREATE_DISEASE_TAG})
  async createDiseaseTag(@Payload() payload: DTO.CreateDiseaseTagRequestDto): Promise<CreateDiseaseTagResponse> {
    return this.diseaseTagService.create(payload)
  }

  @MessagePattern({cmd: DiseaseTagSubject.DELETE_DISEASE_TAG})
  async deleteDiseaseTag(@Payload() payload: DTO.DeleteDiseaseTagRequestDto): Promise<DeleteDiseaseTagResponse> {
    return this.diseaseTagService.delete(payload)
  }
}