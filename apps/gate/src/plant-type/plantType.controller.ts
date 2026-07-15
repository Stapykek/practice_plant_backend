import {
  Body,
  Controller, Delete,
  Get,
  Inject,
  NotImplementedException,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Query,
  UploadedFile, UseInterceptors,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices';
import * as DTO from './dto'
import { PLANT_TYPE_CONTROLLER_TAG, PlantTypeSubject } from '@app/constants'
import { lastValueFrom } from 'rxjs'
import { handleServiceResponse } from '@app/utils'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import {
  CountResponse,
  CreatePlantTypeResponse,
  DeletePlantTypeResponse,
  GetPlantTypeResponse,
  GetPlantTypesResponse,
  ICountResponse,
  ICreatePlantTypeResponse,
  IDeletePlantTypeResponse,
  IGetPlantTypeResponse,
  IGetPlantTypesResponse,
  IUpdatePlantTypeResponse,
  UpdatePlantTypeResponse,
} from '@app/types'
import { Admin } from '@app/infrastructure'
import { FileInterceptor } from '@nestjs/platform-express'

@ApiTags(PLANT_TYPE_CONTROLLER_TAG)
@ApiBearerAuth()
@Controller('plant-type')
export class PlantTypeController {

  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy
  ) {}

  @ApiBearerAuth()
  @ApiOperation({summary: 'Получить вид растений'})
  @Get()
  async getPlantType(@Query() query: DTO.GetPlantTypeRequestDto): Promise<IGetPlantTypeResponse> {
    const result = await lastValueFrom(
      this.natsClient.send<GetPlantTypeResponse>({cmd: PlantTypeSubject.GET_PLANT_TYPE}, query)
    )

    return handleServiceResponse(result)
  }


  @ApiBearerAuth()
  @ApiOperation({summary: 'Получить несколько видов растений (с пагинацией)'})
  @Get('/many')
  async getPlantTypes(@Query() query: DTO.GetPlantTypesRequestDto): Promise<IGetPlantTypesResponse> {
    const result = await lastValueFrom(
      this.natsClient.send<GetPlantTypesResponse>({cmd: PlantTypeSubject.GET_PLANT_TYPES}, query)
    )

    return handleServiceResponse(result)
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Получить количество видов растений'})
  @Get('/count')
  async getPlantTypeCount(): Promise<ICountResponse> {
    const result = await lastValueFrom(
      this.natsClient.send<CountResponse>({cmd: PlantTypeSubject.GET_PLANT_TYPE_COUNT}, {})
    )

    return handleServiceResponse(result)
  }

  //todo ADD FILE HANDLING
  @Admin()
  @ApiBearerAuth()
  @ApiOperation({summary: 'Добавить вид растений (Только администраторы)'})
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: DTO.CreatePlantTypeRequestDto
  })
  @Post('/admin')
  async createPlantType(
    @Body() body: Omit<DTO.CreatePlantTypeRequestDto, 'file'>,
    @UploadedFile(new ParseFilePipeBuilder()
    .addMaxSizeValidator({
      maxSize: 10 * 1024 * 1024,
    })
    .build({
      fileIsRequired: false,
    }),
    )file?: Express.Multer.File
  ): Promise<ICreatePlantTypeResponse> {
    if (file) {
      console.log('post found file', file.originalname)
      throw new NotImplementedException()
    }

    const result = await lastValueFrom(
      this.natsClient.send<CreatePlantTypeResponse>({cmd: PlantTypeSubject.CREATE_PLANT_TYPE}, body)
    )
    return handleServiceResponse(result)
  }

  //todo ADD FILE HANDLING
  @Admin()
  @ApiBearerAuth()
  @ApiOperation({summary: 'Обновить вид растений (Только администраторы)'})
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: DTO.UpdatePlantTypeRequestDto
  })
  @Patch('/admin')
  async updatePlantType(
    @Body() body: Omit<DTO.UpdatePlantTypeRequestDto, 'file'>,
    @UploadedFile(new ParseFilePipeBuilder()
    .addMaxSizeValidator({
      maxSize: 10 * 1024 * 1024,
    })
    .build({
      fileIsRequired: false,
    }),
    )file?: Express.Multer.File
  ): Promise<IUpdatePlantTypeResponse> {
    if (file) {
      console.log('patch found file', file.originalname)
      throw new NotImplementedException()
    }

    const result = await lastValueFrom(
      this.natsClient.send<UpdatePlantTypeResponse>({cmd: PlantTypeSubject.UPDATE_PLANT_TYPE}, body)
    )
    return handleServiceResponse(result)
  }

  @Admin()
  @ApiBearerAuth()
  @ApiOperation({summary: 'Удалить вид растений (Только администраторы)'})
  @Delete('/admin')
  async deletePlantType(@Body() body: DTO.DeletePlantTypeRequestDto): Promise<IDeletePlantTypeResponse> {
    const result = await lastValueFrom(
      this.natsClient.send<DeletePlantTypeResponse>({cmd: PlantTypeSubject.DELETE_PLANT_TYPE}, body)
    )
    return handleServiceResponse(result)
  }

}