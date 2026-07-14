import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IUserPlant } from '@app/types';
import { User } from '@app/entities/user';
import { PlantType } from '@app/entities/plantType';

@Entity('user_plant')
export class UserPlant extends BaseEntity implements IUserPlant {
  @PrimaryGeneratedColumn('uuid',
    {
      name: 'user_plant_id',
    })
  userPlantId: string

  @Column({
    name: 'user_id',
    type: 'uuid',
    nullable: false,
  })
  userId: string

  @Column({
    name: 'plant_type_id',
    type: 'uuid',
    nullable: false,
  })
  plantTypeId: string

  @Column({
    name: 'watered_at',
    type: 'date',
    nullable: false,
  })
  wateredAt: Date

  @Column({
    name: 'planted_at',
    type: 'date',
    nullable: false,
  })
  plantedAt: Date

  @Column({
    type: 'varchar',
    name: 'nickname',
    length: 256,
    unique: true,
    nullable: false
  })
  nickname: string

  @Column({
    type: 'text',
    name: 'image',
    nullable: true
  })
  image?: string

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => PlantType, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plant_type_id' })
  plantType: PlantType
}