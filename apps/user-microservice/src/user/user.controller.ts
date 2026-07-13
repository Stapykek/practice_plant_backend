import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import * as DTO from './dto';

@Controller()
export class UserController {
  @MessagePattern({cmd: 'createUser'})
  async createUser(@Payload() payload: DTO.CreateUserRequestDto){
    console.log(`hi, here's the payload:\n${payload}`)
    return payload
  }
}