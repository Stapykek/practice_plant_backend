import { ISuccessResponse, ServiceResponse } from '@app/types'

export interface ISignInRequest {
  login: string
  password: string
}

export interface ISignUpRequest {
  login: string
  name: string
  password: string
}

export type ISignUpResponse = ISuccessResponse

export interface ISignInResponse {
  token: string
}

export type SignUpResponse = ServiceResponse<ISignUpResponse>
export type SignInResponse = ServiceResponse<ISignInResponse>
