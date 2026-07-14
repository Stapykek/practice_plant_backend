import { HttpStatus } from '@nestjs/common';

export const UserError = {
  ALREADY_EXISTS: {
    status: HttpStatus.CONFLICT,
    message: `user already exists`
  },
  NOT_CREATED: {
    status: HttpStatus.CONFLICT,
    message: `user was not created`
  }
}