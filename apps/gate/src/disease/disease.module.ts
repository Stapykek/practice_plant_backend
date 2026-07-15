import { Module } from "@nestjs/common"
import { DiseaseController } from './disease.controller';
import { NatsClientModule } from '../nats-client/nats-client.module';

@Module({
    imports: [NatsClientModule],
    controllers: [DiseaseController],
    providers: [],
})
export class DiseaseModule {}