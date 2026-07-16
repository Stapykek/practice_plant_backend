import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database'
import { UserPlantModule } from './user-plant/userPlant.module'
import { UserModule } from '../../user-microservice/src/user/user.module'
import { PlantTypeModule } from '../../plant-type-microservice/src/plant-type/plantType.module'

@Module({
  imports: [
    DatabaseModule,
    UserPlantModule,
    UserModule,
    PlantTypeModule,
  ],
})
export class UserPlantMicroserviceModule {}
