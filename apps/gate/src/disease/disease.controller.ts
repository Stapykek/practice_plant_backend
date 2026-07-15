import {
  Body,
  Controller, Delete,
  Get,
  Inject,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices';
import * as DTO from './dto'
import { lastValueFrom } from 'rxjs'
import { handleServiceResponse } from '@app/utils'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import {
  CountResponse,
  CreateDiseaseResponse,
  DeleteDiseaseResponse,
  GetDiseaseResponse,
  GetDiseasesResponse,
  ICountResponse,
  ICreateDiseaseResponse,
  IDeleteDiseaseResponse,
  IGetDiseaseResponse,
  IGetDiseasesResponse,
  IUpdateDiseaseResponse,
  UpdateDiseaseResponse,
} from '@app/types'
import { Admin } from '@app/infrastructure'
import { DISEASE_CONTROLLER_TAG, DiseaseSubject } from '@app/constants'

@ApiTags(DISEASE_CONTROLLER_TAG)
@ApiBearerAuth()
@Controller('disease')
export class DiseaseController {

  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy
  ) {}

  @ApiBearerAuth()
  @ApiOperation({summary: 'Получить тип болезни растений'})
  @Get()
  async getDisease(@Query() query: DTO.GetDiseaseRequestDto): Promise<IGetDiseaseResponse> {
    const result = await lastValueFrom(
      this.natsClient.send<GetDiseaseResponse>({cmd: DiseaseSubject.GET_DISEASE}, query)
    )

    return handleServiceResponse(result)
  }


  @ApiBearerAuth()
  @ApiOperation({summary: 'Получить несколько типов болезней растений (с пагинацией)'})
  @Get('/many')
  async getDiseases(@Query() query: DTO.GetDiseasesRequestDto): Promise<IGetDiseasesResponse> {
    const result = await lastValueFrom(
      this.natsClient.send<GetDiseasesResponse>({cmd: DiseaseSubject.GET_DISEASES}, query)
    )

    return handleServiceResponse(result)
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Получить количество типов болезней растений'})
  @Get('/count')
  async getDiseasesCount(): Promise<ICountResponse> {
    const result = await lastValueFrom(
      this.natsClient.send<CountResponse>({cmd: DiseaseSubject.GET_DISEASES_COUNT}, {})
    )

    return handleServiceResponse(result)
  }

  @Admin()
  @ApiBearerAuth()
  @ApiOperation({summary: 'Добавить тип болезни растений (Только администраторы)'})
  @Post('/admin')
  async createDisease(
    @Body() body: DTO.CreateDiseaseRequestDto,
  ): Promise<ICreateDiseaseResponse> {
    const result = await lastValueFrom(
      this.natsClient.send<CreateDiseaseResponse>({cmd: DiseaseSubject.CREATE_DISEASE}, body)
    )
    return handleServiceResponse(result)
  }

  @Admin()
  @ApiBearerAuth()
  @ApiOperation({summary: 'Обновить тип болезни растений (Только администраторы)'})
  @Patch('/admin')
  async updateDisease(
    @Body() body: DTO.UpdateDiseaseRequestDto
  ): Promise<IUpdateDiseaseResponse> {
    const result = await lastValueFrom(
      this.natsClient.send<UpdateDiseaseResponse>({cmd: DiseaseSubject.UPDATE_DISEASE}, body)
    )
    return handleServiceResponse(result)
  }

  @Admin()
  @ApiBearerAuth()
  @ApiOperation({summary: 'Удалить тип болезни растений (Только администраторы)'})
  @Delete('/admin')
  async deletePlantType(@Body() body: DTO.DeleteDiseaseRequestDto): Promise<IDeleteDiseaseResponse> {
    const result = await lastValueFrom(
      this.natsClient.send<DeleteDiseaseResponse>({cmd: DiseaseSubject.DELETE_DISEASE}, body)
    )
    return handleServiceResponse(result)
  }

}