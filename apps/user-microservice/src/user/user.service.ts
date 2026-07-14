import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/entities';
import { Repository } from 'typeorm';
import { ICreateUserRequest, CreateUserResponse } from '@app/types';
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
}