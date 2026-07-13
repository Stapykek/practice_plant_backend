export interface IUser {
  userId: string
  login: string
  password: string
}

export type ICreateUserRequest = Omit<IUser, 'userId'> 

