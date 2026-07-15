import { InjectRepository } from '@nestjs/typeorm'
import { Disease } from '@app/entities'
import { Repository } from 'typeorm'
import {
  CountResponse,
  CreateDiseaseResponse,
  DeleteDiseaseResponse,
  GetDiseaseResponse,
  GetDiseasesResponse,
  ICreateDiseaseRequest,
  IDeleteDiseaseRequest,
  IGetDiseaseRequest,
  IGetDiseasesRequest,
  IUpdateDiseaseRequest,
  UpdateDiseaseResponse,
} from '@app/types'
import { DiseaseError } from '@app/errors/disease'

export class DiseaseService {
  constructor(
    @InjectRepository(Disease) private readonly diseaseRepository: Repository<Disease>
  ) {}

  async getDisease(request: IGetDiseaseRequest): Promise<GetDiseaseResponse> {
    try {
      return await this.diseaseRepository.findOneByOrFail(request)
    } catch (error) {
      console.log(error)
      return DiseaseError.NOT_FOUND
    }
  }

  async getDiseasesCount(): Promise<CountResponse> {
    try {
      return {count: await this.diseaseRepository.count()}
    } catch (error) {
      console.log(error)
      return DiseaseError.UNKNOWN
    }
  }

  async getDiseases(request: IGetDiseasesRequest): Promise<GetDiseasesResponse> {
    const {count, page} = request

    const skip = Math.max((page - 1) * count, 0)

    try {
      const diseases = await this.diseaseRepository.find({
        skip,
        take: count
      })

      return {
        items: diseases,
        count: diseases.length,
      }

    } catch (error) {
      return DiseaseError.NOT_FOUND
    }
  }

  async createDisease(request: ICreateDiseaseRequest): Promise<CreateDiseaseResponse> {
    const { name } = request

    try {
      const foundDisease = await this.diseaseRepository.findOneBy({ name })
      if (foundDisease)
        return DiseaseError.ALREADY_EXISTS
    } catch (error) {
      console.log(error)
      return DiseaseError.UNKNOWN
    }

    const disease = this.diseaseRepository.create(request)

    try {
      await disease.save()
      await disease.reload()

      return disease
    } catch (error) {
      console.log(error)
      return DiseaseError.NOT_CREATED
    }
  }

  async updateDisease(request: IUpdateDiseaseRequest): Promise<UpdateDiseaseResponse> {
    const { diseaseId, ...changeFields } = request
    try {
      const disease = await this.diseaseRepository.findOneBy({ diseaseId })

      if (!disease){
        return DiseaseError.NOT_FOUND
      }

      this.diseaseRepository.merge(disease, changeFields)
      await disease.save()
      await disease.reload()

      return disease
    } catch (error) {
      console.log(error)
      return DiseaseError.NOT_UPDATED
    }
  }

  async deleteDisease(request: IDeleteDiseaseRequest): Promise<DeleteDiseaseResponse> {
    const { diseaseId } = request
    try {
      const disease = await this.diseaseRepository.findOneBy({ diseaseId })

      if (!disease) {
        return DiseaseError.NOT_FOUND
      }

      await disease.remove()

      return {success: true}
    } catch (error) {
      console.log(error)
      return DiseaseError.NOT_DELETED
    }
  }

}