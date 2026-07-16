import { InjectRepository } from '@nestjs/typeorm'
import { UserPlant } from '@app/entities'
import { Repository } from 'typeorm'
import { UserService } from '../../../user-microservice/src/user/user.service'
import { PlantTypeService } from '../../../plant-type-microservice/src/plant-type/plantType.service'
import {
  CountResponse,
  CreateUserPlantResponse,
  DeleteUserPlantImageResponse,
  DeleteUserPlantResponse,
  GetUserPlantResponse,
  GetUserPlantsResponse,
  ICreateUserPlantRequest,
  IDeleteUserPlantImageRequest,
  IDeleteUserPlantRequest,
  IGetUserPlantCountRequest,
  IGetUserPlantRequest,
  IGetUserPlantsRequest,
  IUpdateUserPlantRequest,
  UpdateUserPlantResponse,
} from '@app/types'
import { UserPlantError } from '@app/errors/userPlant'
import { isErrorResponse } from '@app/utils'
import {
  deleteFileByRelativeUrl
} from '@app/utils'

export class UserPlantService {
  constructor(
    @InjectRepository(UserPlant) private readonly userPlantRepository: Repository<UserPlant>,
    private readonly userService: UserService,
    private readonly plantTypeService: PlantTypeService,
  ) {}

  async get(request: IGetUserPlantRequest): Promise<GetUserPlantResponse> {
   const { userPlantId, userId } = request

    try {
      const [userResponse, userPlant] = await Promise.all([
        this.userService.get({userId}),
        this.userPlantRepository.findOneBy({userPlantId})
      ])

      if (isErrorResponse(userResponse)) {
        return UserPlantError.FORBIDDEN
      }

      if (!userPlant) {
        return UserPlantError.NOT_FOUND
      }
      
      if (userId != userPlant.userId) {
        return UserPlantError.NOT_FOUND
      }

      return userPlant

    } catch (error) {
      console.log(error)
      return UserPlantError.UNKNOWN
    }
  }

  async getMany(request: IGetUserPlantsRequest): Promise<GetUserPlantsResponse> {
    const { userId, page, count } = request

    const skip = Math.max((page - 1) * count, 0)

    try {
      const [userResponse, userPlants] = await Promise.all([
        this.userService.get({userId}),
        this.userPlantRepository.find({
          where: {userId},
          skip,
          take: count
        })
      ])

      if (isErrorResponse(userResponse)) {
        return UserPlantError.FORBIDDEN
      }

      return {
        items: userPlants,
        count: userPlants.length
      }

    } catch (error) {
      console.log(error)
      return UserPlantError.UNKNOWN
    }

  }

  async getCount(request: IGetUserPlantCountRequest): Promise<CountResponse> {
    const { userId } = request

    try {
      const [userResponse, count] = await Promise.all([
        this.userService.get({userId}),
        this.userPlantRepository.countBy({userId})
      ])

      if (isErrorResponse(userResponse)) {
        return UserPlantError.FORBIDDEN
      }

      return { count }
    } catch (error) {
      console.log(error)
      return UserPlantError.UNKNOWN
    }

  }

  async create(request: ICreateUserPlantRequest): Promise<CreateUserPlantResponse> {
    const { userId, plantTypeId, image } = request

    console.log("image: ", image)

    try {
      const [userResponse, plantTypeResponse] = await Promise.all([
        this.userService.get({userId}),
        this.plantTypeService.get({plantTypeId})
      ])

      if (isErrorResponse(userResponse) || isErrorResponse(plantTypeResponse)) {
        return UserPlantError.FORBIDDEN
      }

      const userPlant = this.userPlantRepository.create(request)

      await userPlant.save()
      await userPlant.reload()

      return userPlant

    } catch (error) {

      console.log(error)
      return UserPlantError.UNKNOWN
    }
  }

  async update(request: IUpdateUserPlantRequest): Promise<UpdateUserPlantResponse> {
    const { userId, userPlantId, image } = request

    try {
      const [userResponse, userPlant] = await Promise.all([
        this.userService.get({userId}),
        this.userPlantRepository.findOneBy({userPlantId})
      ])

      if (isErrorResponse(userResponse)) {
        return UserPlantError.FORBIDDEN
      }

      if (!userPlant) {
        return UserPlantError.NOT_FOUND
      }

      if (userId != userPlant.userId) {
        return UserPlantError.NOT_FOUND
      }

      const oldImage = userPlant.image

      this.userPlantRepository.merge(userPlant, request)

      await userPlant.save()
      await userPlant.reload()

      if (oldImage != image && oldImage != null && image !== undefined) {
        deleteFileByRelativeUrl(oldImage)
      }

      return userPlant

    } catch (error) {

      console.log(error)
      return UserPlantError.UNKNOWN
    }
  }

  async delete(request: IDeleteUserPlantRequest): Promise<DeleteUserPlantResponse> {
    const { userId, userPlantId } = request

    try {
      const [userResponse, userPlant] = await Promise.all([
        this.userService.get({ userId }),
        this.userPlantRepository.findOneBy({ userPlantId })
      ])

      if (isErrorResponse(userResponse)) {
        return UserPlantError.FORBIDDEN
      }

      if (!userPlant) {
        return UserPlantError.NOT_FOUND
      }

      if (userPlant.userId != userId) {
        return UserPlantError.NOT_FOUND
      }

      const image = userPlant.image

      await userPlant.remove()

      if (image != null) {
        deleteFileByRelativeUrl(image)
      }

      return {success: true}
    } catch (error) {
      return UserPlantError.UNKNOWN
    }
  }

  async deleteImage(request: IDeleteUserPlantImageRequest): Promise<DeleteUserPlantImageResponse> {
    const { userId, userPlantId } = request

    try {
      const [userResponse, userPlant] = await Promise.all([
        this.userService.get({ userId }),
        this.userPlantRepository.findOneBy({ userPlantId })
      ])

      if (isErrorResponse(userResponse)) {
        return UserPlantError.FORBIDDEN
      }

      if (!userPlant) {
        return UserPlantError.NOT_FOUND
      }

      if (userPlant.userId != userId) {
        return UserPlantError.NOT_FOUND
      }

      const image = userPlant.image
      console.log(`image before: ${image}`)
      if (image == null) {
        return {success: true}
      }

      userPlant.image = null
      await userPlant.save()
      await userPlant.reload()

      console.log("after: ", userPlant.image)

      deleteFileByRelativeUrl(image)

      return {success: true}
    } catch (error) {
      console.log(error)
      return UserPlantError.UNKNOWN
    }
  }

}