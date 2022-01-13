import { ConnectionOptions } from 'typeorm';
import {
  UserEntity,
  BoardEntity,
  ColumnEntity,
  TaskEntity,
} from '../resources';
import {
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_HOST,
} from '../common/config';

const connectionOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  logging: false,
  dropSchema: false,
  entities: [UserEntity, BoardEntity, ColumnEntity, TaskEntity],
  migrationsRun: true,
  migrations: ['src/db/migration/**/*.ts'],
  cli: {
    migrationsDir: './src/db/migration',
  },
} as ConnectionOptions;

export default connectionOptions;
