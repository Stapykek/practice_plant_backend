import { Module } from '@nestjs/common'
import { DatabaseModule } from '@app/database'
import { PlantTypeModule } from './plant-type/plantType.module'

@Module({
  imports: [
    DatabaseModule,
    PlantTypeModule,
  ],
})
export class PlantTypeMicroserviceModule {}
