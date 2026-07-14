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

export interface IUpdateUserRequest {
  password?: string
  name?: string
}

export interface IGetUserRequest {
  userId: string
}

export interface IDeleteUserRequest {
  userId: string
}

