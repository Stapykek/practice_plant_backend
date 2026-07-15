import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database'
import { DiseaseModule } from './disease/disease.module'

@Module({
  imports: [
    DatabaseModule,
    DiseaseModule,
  ],
  controllers: [],
  providers: [],
})
export class DiseaseMicroserviceModule {}
