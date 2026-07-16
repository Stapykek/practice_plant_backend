import { HttpStatus } from '@nestjs/common';

export const DiseaseTagError = {
  NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    message: 'disease tag not found'
  },
  ALREADY_EXISTS: {
    status: HttpStatus.CONFLICT,
    message: 'disease tag already exists'
  },
  TOO_MANY: {
    status: HttpStatus.FORBIDDEN,
    message: 'plant has too many disease tags'
  },
  NOT_DELETED: {
    status: HttpStatus.CONFLICT,
    message: 'disease tag not deleted'
  },
  UNKNOWN: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'unknown error'
  }
}