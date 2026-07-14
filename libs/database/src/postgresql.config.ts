import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Disease, DiseaseTag, PlantType, User, UserPlant } from '@app/entities';
import { registerAs } from '@nestjs/config';

export const dataSourceName = 'postgresql'

export const getPostgreSqlConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.PG_DB_HOST || '127.0.0.1',
  port: Number(process.env.PG_DB_PORT) || 5432,
  username: process.env.PG_DB_USER || 'postgres',
  password: process.env.PG_DB_PASS || 'postgres',
  database: process.env.PG_DB_NAME || 'leafy',
  autoLoadEntities: true,
  entities: [User, PlantType, UserPlant, Disease, DiseaseTag],
  migrations: [__dirname + '/migrations/*.ts']
})

export const PostgreSqlConfig = registerAs(dataSourceName, () => getPostgreSqlConfig())