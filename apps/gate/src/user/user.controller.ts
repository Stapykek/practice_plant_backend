import { Body, Controller, Get, Inject, Patch } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { USER_CONTROLLER_TAG, UserSubject } from '@app/constants'
import { lastValueFrom } from 'rxjs'
import * as types from '@app/types'
import * as DTO from './dto'
import { handleServiceResponse, User } from '@app/utils'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { GetUserResponse, UpdateUserResponse } from '@app/types'

@ApiTags(USER_CONTROLLER_TAG)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({summary: "Получить данные пользователя"})
  @Get()
  async getUser(@User() user: types.ParamUser) {
    const { userId } = user
    const result = await lastValueFrom(this.natsClient.send<GetUserResponse>({cmd: UserSubject.GET_USER}, { userId }))
    return handleServiceResponse(result)
  }

  @ApiBearerAuth()
  @ApiOperation({summary: "Обновить данные пользователя"})
  @Patch()
  async updateUser(@User() user: types.ParamUser, @Body() body: DTO.UpdateUserRequestDto) {
    const { userId } = user
    const result = await lastValueFrom(this.natsClient.send<UpdateUserResponse>({cmd: UserSubject.UPDATE_USER}, { userId, ...body }))
    return handleServiceResponse(result)
  }
}