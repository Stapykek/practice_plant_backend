import { IUser, UserRole } from '@app/types'

export const UserSubject = {
  CREATE_USER: 'createUser',
  UPDATE_USER: 'updateUser',
  DELETE_USER: 'deleteUser',
  GET_USER: 'getUser',
}

export const UserExample: Omit<IUser, 'password'> = {
  userId: '60cc5000-fd7d-41cf-a673-1788db4e73fd',
  login: 'andrew1337',
  name: 'Андрей',
  userRole: UserRole.ADMIN,
}