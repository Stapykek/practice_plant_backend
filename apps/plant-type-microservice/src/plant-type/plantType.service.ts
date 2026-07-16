import { InjectRepository } from '@nestjs/typeorm'
import { PlantType } from '@app/entities'
import { Repository } from 'typeorm'
import {
  CountResponse,
  CreatePlantTypeResponse,
  DeletePlantTypeImageResponse,
  DeletePlantTypeResponse,
  GetPlantTypeResponse,
  GetPlantTypesResponse,
  ICreatePlantTypeRequest,
  IDeletePlantTypeImageRequest,
  IDeletePlantTypeRequest,
  IGetPlantTypeRequest,
  IGetPlantTypesRequest,
  IUpdatePlantTypeRequest,
  UpdatePlantTypeResponse,
} from '@app/types'
import { PlantTypeError } from '@app/errors'
import { deleteFileByRelativeUrl } from '@app/utils'

export class PlantTypeService {
  constructor(
    @InjectRepository(PlantType) private readonly plantTypeRepository: Repository<PlantType>
    ) {}

  async create(request: ICreatePlantTypeRequest): Promise<CreatePlantTypeResponse> {
    const { bioName } = request

    try {
      const foundPlantType = await this.plantTypeRepository.findOneBy({bioName})

      if (foundPlantType) {
        return PlantTypeError.ALREADY_EXISTS
      }

      const plantType = this.plantTypeRepository.create(request)

      await plantType.save()
      await plantType.reload()

      return plantType

    } catch (error) {
      console.log(error)
      return PlantTypeError.NOT_CREATED

    }
  }

  async update(request: IUpdatePlantTypeRequest): Promise<UpdatePlantTypeResponse> {
    const {plantTypeId, ...updateFields} = request

    try {
      const plantType = await this.plantTypeRepository.findOneBy({plantTypeId})

      if (!plantType) {
        return PlantTypeError.NOT_FOUND
      }

      const oldImage = plantType.image

      this.plantTypeRepository.merge(plantType, updateFields)

      await plantType.save()
      await plantType.reload()

      const image = updateFields.image

      if (oldImage != image && oldImage != null && image !== undefined) {
        deleteFileByRelativeUrl(oldImage)
      }

      return plantType

    } catch (error) {
      console.log(error)
      return PlantTypeError.NOT_UPDATED

    }
  }

  async delete(request: IDeletePlantTypeRequest): Promise<DeletePlantTypeResponse> {
    const { plantTypeId } = request
    try {
      const plantType = await this.plantTypeRepository.findOneBy({plantTypeId})

      if (!plantType) {
        return PlantTypeError.NOT_FOUND
      }

      const image = plantType.image

      await plantType.remove()

      if (image != null) {
        deleteFileByRelativeUrl(image)
      }
    } catch (error) {
      console.log(error)
      return PlantTypeError.NOT_DELETED
    }

    return {success: true}
  }

  async deleteImage(request: IDeletePlantTypeImageRequest): Promise<DeletePlantTypeImageResponse> {
    const { plantTypeId } = request
    try {
      const plantType = await this.plantTypeRepository.findOneBy({plantTypeId})

      if (!plantType) {
        return PlantTypeError.NOT_FOUND
      }

      const image = plantType.image

      if (image == null) {
        return {success: true}
      }

      plantType.image = null

      await plantType.save()
      await plantType.reload()

      deleteFileByRelativeUrl(image)

      return {success: true}

    } catch (error) {
      console.log(error)
      return PlantTypeError.UNKNOWN
    }
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

    const plantTypes = await this.plantTypeRepository.find({
      skip,
      take: count,
    })

    return {
      items: plantTypes,
      count: plantTypes.length,
    }
  }

  async getCount(): Promise<CountResponse>{
    const count = await this.plantTypeRepository.count()
    return {count}
  }

}