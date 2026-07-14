import { HttpStatus } from '@nestjs/common';

export const UserError = {
  ALREADY_EXISTS: {
    status: HttpStatus.CONFLICT,
    message: `user already exists`
  },
  NOT_CREATED: {
    status: HttpStatus.CONFLICT,
    message: `user was not created`
  },
  FORBIDDEN: {
    status: HttpStatus.FORBIDDEN,
    message: `this action is forbidden`
  },
  NOT_UPDATED: {
    status: HttpStatus.CONFLICT,
    message: `user was not updated`
  },
  INCORRECT: {
    status: HttpStatus.BAD_REQUEST,
    message: `incorrect login or password`
  }
}