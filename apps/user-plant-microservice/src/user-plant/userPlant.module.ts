import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PlantType, User, UserPlant } from '@app/entities'
import { UserPlantController } from './userPlant.controller'
import { UserPlantService } from './userPlant.service'
import { UserService } from '../../../user-microservice/src/user/user.service'
import { PlantTypeService } from '../../../plant-type-microservice/src/plant-type/plantType.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, PlantType, UserPlant])],
  controllers: [UserPlantController],
  providers: [UserPlantService, UserService, PlantTypeService],
  exports: [UserPlantService],
})
export class UserPlantModule {}