import { ISuccessResponse, ServiceResponse } from '@app/types';

export interface IUser {
  userId: string
  login: string
  password: string
  name: string
  userRole: UserRole
}

export enum UserRole {
  STANDARD = 'standard',
  ADMIN = 'admin',
}

export interface ICreateUserRequest {
  login: string
  password: string
  name: string
  userRole: UserRole
}

export interface ICreateUserResponse {
  userId: string
}

export interface IUpdateUserRequest {
  password?: string
  name?: string
}

export type IUpdateUserResponse = ISuccessResponse

export interface IGetUserRequest {
  userId: string
}

export type IGetUserResponse = Omit<IUser, 'password'>

export interface IDeleteUserRequest {
  userId: string
}

export type IDeleteUserResponse = ISuccessResponse

export type CreateUserResponse = ServiceResponse<ICreateUserResponse>
export type UpdateUserResponse = ServiceResponse<IUpdateUserResponse>
export type GetUserResponse = ServiceResponse<IGetUserResponse>
export type DeleteUserResponse = ServiceResponse<IDeleteUserResponse>


