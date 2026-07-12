import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class UserController {

  constructor(
    @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
  ) {
  }

  @Post()
  async createUser(){}
}