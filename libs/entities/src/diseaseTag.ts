import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { IDiseaseTag } from '@app/types';
import { UserPlant } from '@app/entities/userPlant';
import { Disease } from '@app/entities/disease';

@Entity('disease_tag')
export class DiseaseTag extends BaseEntity implements IDiseaseTag {

  @PrimaryColumn({
    name: 'user_plant_id',
    type: 'uuid',
    unique: true,
  })
  userPlantId: string

  @PrimaryColumn({
    name: 'disease_id',
    type: 'uuid',
    unique: true,
  })
  diseaseId: string

  @ManyToOne(() => UserPlant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_plant_id' })
  userPlant: UserPlant

  @ManyToOne(() => Disease, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'disease_id' })
  disease: Disease
}