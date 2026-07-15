import { InjectRepository } from '@nestjs/typeorm'
import { PlantType } from '@app/entities'
import { Repository } from 'typeorm'
import {
  CountResponse,
  CreatePlantTypeResponse,
  DeletePlantTypeResponse,
  GetPlantTypeResponse,
  GetPlantTypesResponse,
  ICreatePlantTypeRequest,
  IDeletePlantTypeRequest,
  IGetPlantTypeRequest,
  IGetPlantTypesRequest,
  IUpdatePlantTypeRequest,
  UpdatePlantTypeResponse,
} from '@app/types'
import { PlantTypeError } from '@app/errors'

export class PlantTypeService {
  constructor(
    @InjectRepository(PlantType) private readonly plantTypeRepository: Repository<PlantType>
    ) {}

  async create(request: ICreatePlantTypeRequest): Promise<CreatePlantTypeResponse> {
    const {bioName} = request
    const foundPlantType = await this.plantTypeRepository.findOneBy({bioName})

    if (foundPlantType) {
      return PlantTypeError.ALREADY_EXISTS
    }

    const plantType = this.plantTypeRepository.create(request)
    try {
      await plantType.save()
      await plantType.reload()

    } catch (error) {
      console.log(error)
      return PlantTypeError.NOT_CREATED

    }

    return plantType
  }

  async update(request: IUpdatePlantTypeRequest): Promise<UpdatePlantTypeResponse> {
    const {plantTypeId, ...updateFields} = request

    const plantType = await this.plantTypeRepository.findOneBy({plantTypeId})

    if (!plantType) {
      return PlantTypeError.NOT_FOUND
    }

    try {
      this.plantTypeRepository.merge(plantType, updateFields)

      await plantType.save()
      await plantType.reload()

    } catch (error) {
      console.log(error)
      return PlantTypeError.NOT_UPDATED

    }

    return plantType
  }

  async delete(request: IDeletePlantTypeRequest): Promise<DeletePlantTypeResponse> {
    const { plantTypeId } = request

    const plantType = await this.plantTypeRepository.findOneBy({plantTypeId})

    if (!plantType) {
      return PlantTypeError.NOT_FOUND
    }

    try {
      await plantType.remove()
    } catch (error) {
      console.log(error)
      return PlantTypeError.NOT_DELETED
    }

    return {success: true}
  }

  async get(request: IGetPlantTypeRequest): Promise<GetPlantTypeResponse> {
    const { plantTypeId } = request

    const plantType = await this.plantTypeRepository.findOneBy({plantTypeId})

    if (!plantType) {
      return PlantTypeError.NOT_FOUND
    }

    return plantType
  }

  async getMany(request: IGetPlantTypesRequest): Promise<GetPlantTypesResponse> {
    const { count, page } = request

    const skip = Math.max((page - 1) * count, 0)

    const [plantTypes, total] = await this.plantTypeRepository.findAndCount({
      skip,
      take: count,
    })

    return {
      items: plantTypes,
      count: total
    }
  }

  async getCount(): Promise<CountResponse>{
    const count = await this.plantTypeRepository.count()
    return {count}
  }

}