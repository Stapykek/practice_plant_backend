import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '@app/infrastructure'
import { JwtModule } from '@nestjs/jwt'
import {
  jwtConstants,
  STATIC_SERVE_ROUTE,
  UPLOAD_FOLDER_PATH,
} from '@app/constants'
import { AuthModule } from './auth/auth.module'
import { PlantTypeModule } from './plant-type/plantType.module'
import { DiseaseModule } from './disease/disease.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { UserPlantModule } from './user-plant/userPlant.module'
import { DiseaseTagModule } from './disease-tag/diseaseTag.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${process.env.NODE_ENV}.env`, '.env'],
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    ServeStaticModule.forRoot({
      rootPath: UPLOAD_FOLDER_PATH,
      serveRoot: `/${STATIC_SERVE_ROUTE}`
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    PlantTypeModule,
    DiseaseModule,
    UserPlantModule,
    DiseaseTagModule
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
})
export class AppModule {}
