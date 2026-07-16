import { Module } from "@nestjs/common"
import { UserPlantController } from './userPlant.controller';
import { NatsClientModule } from '../nats-client/nats-client.module';

@Module({
    imports: [NatsClientModule],
    controllers: [UserPlantController],
    providers: [],
})
export class UserPlantModule {}