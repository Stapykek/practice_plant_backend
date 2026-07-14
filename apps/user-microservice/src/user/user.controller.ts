import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import * as DTO from './dto';
import { UserService } from './user.service';
import {
  CreateUserResponse,
  DeleteUserResponse,
  GetUserResponse,
  UpdateUserResponse,
} from '@app/types'
import { UserSubject } from '@app/constants'
import { GetUserRequestDto } from './dto'

@Controller()
export class UserController {
  constructor(
    private userService: UserService
  ) {}
  
  @MessagePattern({cmd: UserSubject.CREATE_USER})
  async createUser(@Payload() payload: DTO.CreateUserRequestDto): Promise<CreateUserResponse>{
    return await this.userService.create(payload)
  }

  @MessagePattern({cmd: UserSubject.UPDATE_USER})
  async updateUser(@Payload() payload: DTO.UpdateUserRequestDto): Promise<UpdateUserResponse>{
    return await this.userService.update(payload)
  }

  @MessagePattern({cmd: UserSubject.DELETE_USER})
  async deleteUser(payload: DTO.DeleteUserRequestDto): Promise<DeleteUserResponse>{
    return await this.userService.delete(payload)
  }

  @MessagePattern({cmd: UserSubject.GET_USER})
  async getUser(@Payload() payload: GetUserRequestDto): Promise<GetUserResponse>{
    return await this.userService.get(payload)
  }
}