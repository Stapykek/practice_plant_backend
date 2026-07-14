import { ServiceResponse, ErrorResponse } from '@app/types'
import { HttpException, HttpStatus } from '@nestjs/common'

export function handleServiceResponse<T>(res: ServiceResponse<T>): T {
  if (isErrorResponse(res)){
    const err = res as ErrorResponse
    throw new HttpException(err.message, err.status)
  }
  return res as T
}

function isErrorResponse(obj: any): boolean {
  return 'status' in obj && typeof obj.status === typeof HttpStatus && 'message' in obj && typeof obj.message === 'string'
}