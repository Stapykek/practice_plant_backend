import { HttpStatus } from '@nestjs/common'

export interface ErrorResponse {
  status: HttpStatus
  message: string
}

export type ServiceResponse<T> = T | ErrorResponse

export interface ISuccessResponse {
  success: boolean
}

export interface ICountResponse {
  count: number
}
