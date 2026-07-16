import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IDisease } from '@app/types/disease';

@Entity('disease')
export class Disease extends BaseEntity implements IDisease {
  @PrimaryGeneratedColumn('uuid',
    {
      name: 'disease_id'
    })
  diseaseId: string

  @Column({
    type: 'varchar',
    name: 'name',
    length: 256,
    unique: true,
    nullable: false
  })
  name: string

  @Column({
    type: 'varchar',
    name: 'displayName',
    length: 256,
    unique: true,
    nullable: false
  })
  displayName: string

  @Column({
    type: 'text',
    name: 'treatment',
    nullable: false,
  })
  treatment: string

}