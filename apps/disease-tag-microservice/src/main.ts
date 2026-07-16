import { DiseaseTagMicroserviceModule } from './disease-tag-microservice.module';
import { bootstrapNatsMicroservice } from '@app/infrastructure'

bootstrapNatsMicroservice(DiseaseTagMicroserviceModule, 'diseaseTag')
