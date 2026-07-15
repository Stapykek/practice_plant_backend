import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import { PlantType, User } from '@app/entities'
import {PlantTypeController} from "./plant-type.controller";
import {PlantTypeService} from "./plant-type.service";
import { UserModule } from '../../../user-microservice/src/user/user.module'

@Module({
    imports: [
      UserModule,
      TypeOrmModule.forFeature([User, PlantType]),
    ],
    controllers: [PlantTypeController],
    providers: [PlantTypeService],
})
export class PlantTypeModule {}