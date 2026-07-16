import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database'
import { DiseaseTagModule } from './disease-tag/diseaseTag.module'
import { UserPlantModule } from '../../user-plant-microservice/src/user-plant/userPlant.module'
import { DiseaseModule } from '../../disease-microservice/src/disease/disease.module'
import { PlantTypeModule } from '../../plant-type-microservice/src/plant-type/plantType.module'

@Module({
  imports: [
    DatabaseModule,
    DiseaseTagModule,
    UserPlantModule,
    PlantTypeModule,
    DiseaseModule,
  ]
})
export class DiseaseTagMicroserviceModule {}
