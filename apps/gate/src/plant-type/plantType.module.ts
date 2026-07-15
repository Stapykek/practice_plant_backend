import { Module } from "@nestjs/common"
import { PlantTypeController } from './plantType.controller';
import { NatsClientModule } from '../nats-client/nats-client.module';

@Module({
    imports: [NatsClientModule],
    controllers: [PlantTypeController],
    providers: [],
})
export class PlantTypeModule {}