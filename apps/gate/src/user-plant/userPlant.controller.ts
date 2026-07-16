import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices';
import * as DTO from './dto'
import { USER_PLANT_CONTROLLER_TAG, UserPlantSubject } from '@app/constants'
import { lastValueFrom } from 'rxjs'
import {
  extractHost, generateRelativeUrl,
  getImageUploadPipe,
  getImageUploadMulterOptions,
  handleImageServiceResponse,
  handleServiceResponse,
  User,
} from '@app/utils'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import type {
  ParamUser,
} from '@app/types'
import {
  CreateUserPlantResponse,
  DeleteUserPlantImageResponse,
  DeleteUserPlantResponse,
  GetUserPlantsResponse,
  ICreateUserPlantResponse,
  IDeleteUserPlantResponse,
  IGetUserPlantsResponse,
  IUpdateUserPlantResponse,
  UpdateUserPlantResponse,
  CountResponse,
  GetUserPlantResponse,
  ICountResponse,
  IGetUserPlantResponse,
} from '@app/types'
import { FileInterceptor } from '@nestjs/platform-express'
import type { Request } from 'express'

@ApiTags(USER_PLANT_CONTROLLER_TAG)
@ApiBearerAuth()
@Controller('user-plant')
export class UserPlantController {

  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy
  ) {}

  @ApiBearerAuth()
  @ApiOperation({summary: 'Получить растение пользователя'})
  @Get()
  async getPlantType(
    @Req() req: Request,
    @User() user: ParamUser,
    @Query() query: DTO.GetUserPlantRequestDto
  ): Promise<IGetUserPlantResponse> {
    const result = await lastValueFrom(
      this.natsClient.send<GetUserPlantResponse>({cmd: UserPlantSubject.GET_USER_PLANT}, {...query, userId: user.userId})
    )

    return handleImageServiceResponse(extractHost(req), result)
  }


  @ApiBearerAuth()
  @ApiOperation({summary: 'Получить несколько растений пользователя (с пагинацией)'})
  @Get('/many')
  async getPlantTypes(
    @Req() req: Request,
    @User() user: ParamUser,
    @Query() query: DTO.GetUserPlantsRequestDto
  ): Promise<IGetUserPlantsResponse> {
    const result = await lastValueFrom(
      this.natsClient.send<GetUserPlantsResponse>({cmd: UserPlantSubject.GET_USER_PLANTS}, {...query, userId: user.userId})
    )

    return handleImageServiceResponse(extractHost(req), result)
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Получить количество растений у пользователя'})
  @Get('/count')
  async getPlantTypeCount(
    @User() user: ParamUser,
  ): Promise<ICountResponse> {
    const { userId } = user

    const result = await lastValueFrom(
      this.natsClient.send<CountResponse>({cmd: UserPlantSubject.GET_USER_PLANT_COUNT}, { userId })
    )

    return handleServiceResponse(result)
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Добавить растение пользователя'})
  @UseInterceptors(FileInterceptor('file', getImageUploadMulterOptions()))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: DTO.CreateUserPlantRequestDto
  })
  @Post()
  async createUserPlant(
    @User() user: ParamUser,
    @Req() req: Request,
    @Body() body: Omit<DTO.CreateUserPlantRequestDto, 'file'>,
    @UploadedFile(getImageUploadPipe(),
    )file?: Express.Multer.File
  ): Promise<ICreateUserPlantResponse> {
    const { userId } = user

    let image: string | undefined = undefined
    if (file) {
      image = generateRelativeUrl(file.filename)
      console.log("image: ", image)
    }

    const result = await lastValueFrom(
      this.natsClient.send<CreateUserPlantResponse>({cmd: UserPlantSubject.CREATE_USER_PLANT}, {...body, userId, image})
    )
    return handleImageServiceResponse(extractHost(req), result)
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Обновить растение пользователя'})
  @UseInterceptors(FileInterceptor('file', getImageUploadMulterOptions()))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: DTO.UpdateUserPlantRequestDto
  })
  @Patch()
  async updateUserPlant(
    @Req() req: Request,
    @User() user: ParamUser,
    @Body() body: Omit<DTO.CreateUserPlantRequestDto, 'file'>,
    @UploadedFile(getImageUploadPipe(),
    )file?: Express.Multer.File
  ): Promise<IUpdateUserPlantResponse> {
    const { userId } = user
    let image: string | undefined = undefined
    if (file) {
      image = generateRelativeUrl(file.filename)
    }

    const result = await lastValueFrom(
      this.natsClient.send<UpdateUserPlantResponse>({cmd: UserPlantSubject.UPDATE_USER_PLANT}, {...body, userId, image})
    )
    return handleImageServiceResponse(extractHost(req), result)
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Удалить растение пользователя'})
  @Delete()
  async deleteUserPlant(
    @User() user: ParamUser,
    @Body() body: DTO.DeleteUserPlantRequestDto
  ): Promise<IDeleteUserPlantResponse> {
    const { userId } = user
    const result = await lastValueFrom(
      this.natsClient.send<DeleteUserPlantResponse>({cmd: UserPlantSubject.DELETE_USER_PLANT}, {...body, userId} )
    )
    return handleServiceResponse(result)
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Удалить картинку растения пользователя'})
  @Delete('/image')
  async deleteUserPlantImage(
    @User() user: ParamUser,
    @Body() body: DTO.DeleteUserPlantImageRequestDto
  ): Promise<IDeleteUserPlantResponse> {
    const { userId } = user
    const result = await lastValueFrom(
      this.natsClient.send<DeleteUserPlantImageResponse>({cmd: UserPlantSubject.DELETE_USER_PLANT_IMAGE}, {...body, userId} )
    )
    return handleServiceResponse(result)
  }

}