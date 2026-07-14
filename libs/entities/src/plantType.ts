import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPlantType } from '@app/types';

@Entity('plant_type')
export class PlantType extends BaseEntity implements IPlantType {
  @PrimaryGeneratedColumn('uuid',
    {
      name: 'plant_type_id',
    })
  plantTypeId: string

  @Column({
    type: 'varchar',
    name: 'bio_name',
    length: 256,
    unique: true,
    nullable: false
  })
  bioName: string

  @Column({
    type: 'varchar',
    name: 'name',
    length: 256,
    unique: true,
    nullable: false
  })
  name: string

  @Column({
    type: 'smallint',
    name: 'watering_frequency',
    nullable: false
  })
  wateringFrequency: number

  @Column({
    type: 'varchar',
    name: 'temperature_preference',
    length: 256,
    nullable: false
  })
  temperaturePreference: string

  @Column({
    type: 'varchar',
    name: 'light_preference',
    length: 256,
    nullable: false
  })
  lightPreference: string

  @Column({
    type: 'text',
    name: 'description',
    nullable: false
  })
  description: string

  @Column({
    type: 'text',
    name: 'image',
    nullable: false
  })
  image: string
}