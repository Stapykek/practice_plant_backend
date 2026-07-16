import { HttpStatus } from '@nestjs/common';

export const UserPlantError = {
  NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    message: 'user-plant not found'
  },
  ALREADY_EXISTS: {
    status: HttpStatus.CONFLICT,
    message: 'user-plant already exists'
  },
  NOT_CREATED: {
    status: HttpStatus.CONFLICT,
    message: 'user-plant not created'
  },
  NOT_UPDATED: {
    status: HttpStatus.CONFLICT,
    message: 'user-plant not updated'
  },
  NOT_DELETED: {
    status: HttpStatus.CONFLICT,
    message: 'user-plant not deleted'
  },
  UNKNOWN: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'unknown error'
  },
  FORBIDDEN: {
    status: HttpStatus.FORBIDDEN,
    message: 'you can not perform this action'
  }
}