import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as DTO from './dto';

@Controller('user')
export class UserController {

  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy
  ) {}

  @Post()
  async createUser(@Body() body: DTO.CreateUserRequestDto){
    console.log(body);
    return this.natsClient.send({cmd: 'createUser'}, body);
  }
}