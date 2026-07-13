import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${process.env.NODE_ENV}.env`,'.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('PG_DB_HOST', '127.0.0.1'),
        port: configService.get<number>('PG_DB_PORT', 5432),
        username: configService.get<string>('PG_DB_USER', 'postgres'),
        password: configService.get<string>('PG_DB_PASS', 'postgres'),
        database: configService.get<string>('PG_DB_NAME', 'leafy'),
        autoLoadEntities: true,
        synchronize: configService.get<boolean>('PG_DB_SYNCHRONIZE', false),
        entities: []
      }),
    })
  ]
})
export class DatabaseModule {}
