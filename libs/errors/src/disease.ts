import { HttpStatus } from '@nestjs/common';

export const DiseaseError = {
  NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    message: 'disease not found'
  },
  ALREADY_EXISTS: {
    status: HttpStatus.CONFLICT,
    message: 'disease already exists'
  },
  NOT_CREATED: {
    status: HttpStatus.CONFLICT,
    message: 'disease not created'
  },
  NOT_UPDATED: {
    status: HttpStatus.CONFLICT,
    message: 'disease not updated'
  },
  NOT_DELETED: {
    status: HttpStatus.CONFLICT,
    message: 'disease not deleted'
  },
  UNKNOWN: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'unknown error'
  }
}