import { ServiceResponse, ErrorResponse } from '@app/types'
import { HttpException } from '@nestjs/common'

export function handleServiceResponse<T>(res: ServiceResponse<T>): T {
  if (isErrorResponse(res)){
    const err = res as ErrorResponse
    throw new HttpException(err.message, err.status)
  }
  return res as T
}

export function isErrorResponse(obj: any): boolean {
  return 'status' in obj && typeof obj.status === "number" && 'message' in obj && typeof obj.message === 'string'
}
