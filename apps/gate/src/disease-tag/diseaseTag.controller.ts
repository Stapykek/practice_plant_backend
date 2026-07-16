import {
  Body,
  Controller, Delete,
  Get,
  Inject,
  Post,
  Query,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices';
import * as DTO from './dto'
import { lastValueFrom } from 'rxjs'
import { handleServiceResponse, User } from '@app/utils'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import {
  CreateDiseaseTagResponse,
  DeleteDiseaseTagResponse,
  GetDiseaseTagsResponse,
  ICreateDiseaseTagResponse,
  IDeleteDiseaseTagResponse,
  IGetDiseaseTagsResponse,
} from '@app/types'
import type { ParamUser } from '@app/types'
import { Admin } from '@app/infrastructure'
import {
  DISEASE_TAG_CONTROLLER_TAG,
  DiseaseTagSubject
} from '@app/constants'

@ApiTags(DISEASE_TAG_CONTROLLER_TAG)
@ApiBearerAuth()
@Controller('disease-tag')
export class DiseaseTagController {

  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy
  ) {}

  @ApiBearerAuth()
  @ApiOperation({summary: 'Получить отметки о болезнях растения (все)'})
  @Get()
  async getDiseaseTags(
    @User() user: ParamUser,
    @Query() query: DTO.GetDiseaseTagsRequestDto
  ): Promise<IGetDiseaseTagsResponse> {
    const result = await lastValueFrom(
      this.natsClient.send<GetDiseaseTagsResponse>({cmd: DiseaseTagSubject.GET_DISEASE_TAGS}, {...query, userId: user.userId})
    )

    return handleServiceResponse(result)
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Добавить отметку о болезни растения'})
  @Post()
  async createDiseaseTag(
    @User() user: ParamUser,
    @Body() body: DTO.CreateDiseaseTagRequestDto,
  ): Promise<ICreateDiseaseTagResponse> {
    const result = await lastValueFrom(
      this.natsClient.send<CreateDiseaseTagResponse>({cmd: DiseaseTagSubject.CREATE_DISEASE_TAG}, {...body, userId: user.userId})
    )
    return handleServiceResponse(result)
  }

  @Admin()
  @ApiBearerAuth()
  @ApiOperation({summary: 'Удалить отметку о болезни растения'})
  @Delete()
  async deleteDiseaseTag(
    @User() user: ParamUser,
    @Body() body: DTO.DeleteDiseaseTagRequestDto
  ): Promise<IDeleteDiseaseTagResponse> {
    const result = await lastValueFrom(
      this.natsClient.send<DeleteDiseaseTagResponse>({cmd: DiseaseTagSubject.DELETE_DISEASE_TAG}, {...body, userId: user.userId})
    )
    return handleServiceResponse(result)
  }

}