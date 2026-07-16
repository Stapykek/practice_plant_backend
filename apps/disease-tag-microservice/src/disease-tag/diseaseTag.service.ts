import { InjectRepository } from '@nestjs/typeorm'
import { DiseaseTag } from '@app/entities'
import { UserPlantService } from '../../../user-plant-microservice/src/user-plant/userPlant.service'
import { DiseaseService } from '../../../disease-microservice/src/disease/disease.service'
import {
  CreateDiseaseTagResponse,
  DeleteDiseaseTagResponse,
  ErrorResponse,
  GetDiseaseTagsResponse,
  ICreateDiseaseTagRequest,
  IGetDiseaseTagsRequest,
} from '@app/types'
import { isErrorResponse } from '@app/utils'
import { DiseaseTagError } from '@app/errors'
import { Repository } from 'typeorm'

export class DiseaseTagService {
  constructor(
    @InjectRepository(DiseaseTag) private readonly diseaseTagRepository: Repository<DiseaseTag>,
    private readonly userPlantService: UserPlantService,
    private readonly diseaseService: DiseaseService,
  ) {}

  async getMany(request: IGetDiseaseTagsRequest): Promise<GetDiseaseTagsResponse> {
    try {
      console.log('reqqq', JSON.stringify(request))
      const userPlantResponse = await this.userPlantService.get(request)

      if (!userPlantResponse || isErrorResponse(userPlantResponse)) {
        return userPlantResponse as ErrorResponse
      }

      const [diseaseTags, count] = await this.diseaseTagRepository.findAndCountBy({
        userPlantId: request.userPlantId,
      })

      return {
        items: diseaseTags,
        count,
      }
    } catch (error) {
      console.log(error)
      return DiseaseTagError.UNKNOWN
    }
  }
  
  async create(request: ICreateDiseaseTagRequest): Promise<CreateDiseaseTagResponse> {
    const { userId, userPlantId, diseaseId } = request
    try {
      const [userPlantResponse, diseaseResponse, foundDiseaseTag] =
        await Promise.all([
          this.userPlantService.get({ userId, userPlantId }),
          this.diseaseService.getDisease({ diseaseId }),
          this.diseaseTagRepository.findOneBy({ userPlantId, diseaseId }),
        ])

      if (!userPlantResponse || isErrorResponse(userPlantResponse)) {
        return userPlantResponse as ErrorResponse
      }

      if (!diseaseResponse || isErrorResponse(diseaseResponse)) {
        return diseaseResponse as ErrorResponse
      }

      if (foundDiseaseTag) {
        return DiseaseTagError.ALREADY_EXISTS
      }

      const diseaseTag = this.diseaseTagRepository.create({ userPlantId, diseaseId })
      await diseaseTag.save()
      await diseaseTag.reload()

      return diseaseTag
    } catch (error) {
      console.log(error)
      return DiseaseTagError.UNKNOWN
    }
  }

  async delete(request: ICreateDiseaseTagRequest): Promise<DeleteDiseaseTagResponse> {
    const { userId, userPlantId, diseaseId } = request
    try {
      const [userPlantResponse, diseaseTag] =
        await Promise.all([
          this.userPlantService.get({ userId, userPlantId }),
          this.diseaseTagRepository.findOneBy({ userPlantId, diseaseId }),
        ])

      if (!userPlantResponse || isErrorResponse(userPlantResponse)) {
        return userPlantResponse as ErrorResponse
      }

      if (!diseaseTag) {
        return DiseaseTagError.NOT_FOUND
      }

      await diseaseTag.remove()

      return {success: true}
    } catch (error) {
      console.log(error)
      return DiseaseTagError.NOT_DELETED
    }
  }

}