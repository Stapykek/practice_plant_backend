import { UserPlantMicroserviceModule } from './user-plant-microservice.module';
import { bootstrapNatsMicroservice } from '@app/infrastructure'

bootstrapNatsMicroservice(UserPlantMicroserviceModule, 'userPlant')
