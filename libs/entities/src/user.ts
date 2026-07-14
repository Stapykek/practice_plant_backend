import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser, UserRole } from '@app/types';

@Entity('user')
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn('uuid',
    {
      name: 'user_id'
    })
  userId: string

  @Column({
    type: 'varchar',
    name: 'login',
    length: 256,
    unique: true,
    nullable: false
  })
  login: string

  @Column({
    type: 'varchar',
    name: 'password',
    length: 256,
    nullable: false
  })
  password: string


  @Column({
    type: 'varchar',
    name: 'name',
    length: 256,
    nullable: false
  })
  name: string

  @Column({
    type: 'enum',
    name: 'user_role',
    nullable: false,
    enum: UserRole
  })
  userRole: UserRole

}