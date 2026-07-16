import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Disease, UserPlant, User, DiseaseTag, PlantType } from '@app/entities'
import { DiseaseTagController } from './diseaseTag.controller'
import { DiseaseTagService } from './diseaseTag.service'
import { DiseaseService } from '../../../disease-microservice/src/disease/disease.service'
import { UserPlantService } from '../../../user-plant-microservice/src/user-plant/userPlant.service'
import { UserService } from '../../../user-microservice/src/user/user.service'
import { PlantTypeService } from '../../../plant-type-microservice/src/plant-type/plantType.service'

@Module({
  imports: [TypeOrmModule.forFeature([
    UserPlant,
    User,
    Disease,
    DiseaseTag,
    PlantType])],
  controllers: [DiseaseTagController],
  providers: [UserService, PlantTypeService, UserPlantService, DiseaseService, DiseaseTagService]
})
export class DiseaseTagModule {}