import { Module } from '@nestjs/common'
import { DatabaseModule } from '@app/database'
import { PlantTypeModule } from './plant-type/plant-type.module'

@Module({
  imports: [
    DatabaseModule,
    PlantTypeModule,
  ],
})
export class PlantTypeMicroserviceModule {}
