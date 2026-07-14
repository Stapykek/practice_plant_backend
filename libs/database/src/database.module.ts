import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dataSourceName, PostgreSqlConfig } from '@app/database/postgresql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [PostgreSqlConfig],
      envFilePath: [`${process.env.NODE_ENV}.env`,'.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get<TypeOrmModuleOptions>(dataSourceName)!,
    })
  ]
})
export class DatabaseModule {}
