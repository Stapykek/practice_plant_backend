import { DataSource, DataSourceOptions } from 'typeorm';
import { getPostgreSqlConfig } from '@app/database/postgresql.config';

require('dotenv').config({path: process.env.NODE_ENV ? `${process.env.NODE_ENV}.env` : '.env'})

//DataSource создаётся только для работы скриптов синхронизации и миграции nest-cli
export const AppDataSource = new DataSource(getPostgreSqlConfig() as DataSourceOptions)