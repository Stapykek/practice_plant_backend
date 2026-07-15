import { DiseaseMicroserviceModule } from './disease-microservice.module';
import { bootstrapNatsMicroservice } from '@app/infrastructure'

bootstrapNatsMicroservice(DiseaseMicroserviceModule, 'disease')