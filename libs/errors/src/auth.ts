import { HttpStatus } from '@nestjs/common';

export const AuthError = {
  FORBIDDEN: {
    status: HttpStatus.FORBIDDEN,
    message: 'you can not perform this action',
  },
  INCORRECT_CREDENTIALS: {
    status: HttpStatus.BAD_REQUEST,
    message: `incorrect login or password`
  }
}