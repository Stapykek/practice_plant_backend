import { HttpStatus } from '@nestjs/common';

export const PlantTypeError = {
  ALREADY_EXISTS: {
    status: HttpStatus.CONFLICT,
    message: `plant-type already exists`
  },
  NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    message: `plant-type not found`
  },
  NOT_CREATED: {
    status: HttpStatus.CONFLICT,
    message: `plant-type was not created`
  },
  FORBIDDEN: {
    status: HttpStatus.FORBIDDEN,
    message: `this action is forbidden`
  },
  NOT_UPDATED: {
    status: HttpStatus.CONFLICT,
    message: `plant-type was not updated`
  },
  NOT_DELETED: {
    status: HttpStatus.CONFLICT,
    message: `plant-type was not deleted`
  }
}