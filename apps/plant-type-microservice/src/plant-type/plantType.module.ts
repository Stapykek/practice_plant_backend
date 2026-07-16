import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import { PlantType, User } from '@app/entities'
import {PlantTypeController} from "./plantType.controller";
import {PlantTypeService} from "./plantType.service";
import { UserModule } from '../../../user-microservice/src/user/user.module'

@Module({
    imports: [
      UserModule,
      TypeOrmModule.forFeature([User, PlantType]),
    ],
    controllers: [PlantTypeController],
    providers: [PlantTypeService],
    exports: [PlantTypeService],
})
export class PlantTypeModule {}