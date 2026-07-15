import { bootstrapNatsMicroservice } from '@app/infrastructure'
import { PlantTypeMicroserviceModule } from './plant-type-microservice.module'

bootstrapNatsMicroservice(PlantTypeMicroserviceModule, 'plantType')
