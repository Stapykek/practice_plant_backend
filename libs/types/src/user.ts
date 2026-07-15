import { ISuccessResponse, ServiceResponse } from '@app/types';

export interface IUser {
  userId: string
  login: string
  password: string
  name: string
  userRole: UserRole
}

export type ParamUser = Pick<IUser, 'userId' | 'login' | 'userRole'>

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

export type IUserResponse = Omit<IUser, 'password'>

export type ICreateUserResponse = IUserResponse

export interface IUpdateUserRequest {
  userId: string
  name: string
}

export type IUpdateUserResponse = IUserResponse

export interface IGetUserRequest {
  userId: string
}

export type IGetUserResponse = IUserResponse

export interface IFindUserRequest {
  login: string
}

export type IFindUserResponse = IUser

export interface IDeleteUserRequest {
  userId: string
}

export type IDeleteUserResponse = ISuccessResponse

export type CreateUserResponse = ServiceResponse<ICreateUserResponse>
export type UpdateUserResponse = ServiceResponse<IUpdateUserResponse>
export type GetUserResponse = ServiceResponse<IGetUserResponse>
export type DeleteUserResponse = ServiceResponse<IDeleteUserResponse>
export type FindUserResponse = ServiceResponse<IFindUserResponse>


