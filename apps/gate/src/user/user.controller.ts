import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as DTO from './dto';
import { UserSubject } from '@app/constants'
import { firstValueFrom } from 'rxjs'
import { CreateUserResponse } from '@app/types'
import { handleServiceResponse } from '@app/utils'

@Controller('user')
export class UserController {

  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy
  ) {}

  @Post()
  async createUser(@Body() body: DTO.CreateUserRequestDto){
    const response = await firstValueFrom(this.natsClient.send<CreateUserResponse>({cmd: UserSubject.CREATE_USER}, body))
    return handleServiceResponse(response)
  }


}