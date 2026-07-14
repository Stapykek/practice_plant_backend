import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/entities';
import { Repository } from 'typeorm'
import {
  ICreateUserRequest,
  CreateUserResponse,
  UpdateUserResponse,
  IUpdateUserRequest,
  IDeleteUserRequest,
  DeleteUserResponse,
  IGetUserRequest,
  GetUserResponse,
  IFindUserRequest,
  FindUserResponse,
} from '@app/types'
import { UserError } from '@app/errors';

export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  public async create(request: ICreateUserRequest): Promise<CreateUserResponse> {
    const { login } = request
    const foundUser = await this.userRepository.findOneBy({ login })
    if (foundUser) {
      return UserError.ALREADY_EXISTS
    }

    const user = this.userRepository.create(request)
    await user.save()
    await user.reload()

    if (!user) {
      return UserError.NOT_CREATED
    }

    return user
  }
  
  public async update(request: IUpdateUserRequest): Promise<UpdateUserResponse> {
    const { userId, name } = request

    const user = await this.userRepository.findOneBy({ userId })

    if (!user) {
      return UserError.FORBIDDEN
    }

    user.name = name

    await user.save()
    await user.reload()

    if (!user) {
      return UserError.NOT_UPDATED
    }

    return {success: true}
  }

  public async delete(request: IDeleteUserRequest): Promise<DeleteUserResponse> {
    const { userId } = request

    const user = await this.userRepository.findOneBy({ userId })

    if (!user) {
      return UserError.FORBIDDEN
    }

    try {
      await this.userRepository.remove(user)
    }
    catch (error) {
      return UserError.FORBIDDEN
    }
    return {success: true}

  }

  public async get(request: IGetUserRequest): Promise<GetUserResponse> {
    const { userId } = request

    const user = await this.userRepository.findOneBy({ userId })

    if (!user) {
      return UserError.FORBIDDEN
    }

    const {password, ...result} = user
    return result
  }

  public async findOne(request: IFindUserRequest): Promise<FindUserResponse> {
    const { login } = request

    const user = await this.userRepository.findOneBy({ login })

    if (!user) {
      return UserError.FORBIDDEN
    }

    return user
  }
}