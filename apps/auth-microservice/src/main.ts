import { AuthMicroserviceModule } from './auth-microservice.module';
import { bootstrapNatsMicroservice } from '@app/infrastructure'

bootstrapNatsMicroservice(AuthMicroserviceModule, 'auth')
