import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import * as DTO from './dto';
import { UserService } from './user.service';
import {
  CreateUserResponse,
} from '@app/types'
import { UserSubject } from '@app/constants'

@Controller()
export class UserController {
  constructor(
    @Inject(UserService) private userService: UserService
  ) {}
  
  @MessagePattern({cmd: UserSubject.CREATE_USER})
  async createUser(@Payload() payload: DTO.CreateUserRequestDto): Promise<CreateUserResponse>{
    return await this.userService.create(payload)
  }
}