import * as dotenv from 'dotenv';
import * as path from 'path';
import { ConnectionOptions } from 'typeorm';
import { BoardEntity } from '../boards/entities/board.entity';
import { ColumnEntity } from '../boards/entities/column.entity';
import { TaskEntity } from '../tasks/entities/task.entity';
import { UserEntity } from '../users/entities/user.entity';

dotenv.config();

const ormConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [UserEntity, BoardEntity, ColumnEntity, TaskEntity],
  synchronize: false,
  logging: false,
  dropSchema: false,
  migrationsRun: true,
  autoLoadEntities: true,
  migrations: ['dist/db/migration/*.{ts,js}'],
  cli: {
    migrationsDir: path.join(__dirname, './src/db/migration'),
  },
} as ConnectionOptions;

export default ormConfig;
