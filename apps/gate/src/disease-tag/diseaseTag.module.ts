import { Module } from "@nestjs/common"
import { DiseaseTagController } from './diseaseTag.controller';
import { NatsClientModule } from '../nats-client/nats-client.module';

@Module({
    imports: [NatsClientModule],
    controllers: [DiseaseTagController],
    providers: [],
})
export class DiseaseTagModule {}