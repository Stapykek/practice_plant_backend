import { UserMicroserviceModule } from './user-microservice.module';
import { bootstrapNatsMicroservice } from '@app/infrastructure';

bootstrapNatsMicroservice(UserMicroserviceModule, 'user');
