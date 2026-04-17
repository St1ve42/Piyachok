import { ConfigService } from '@nestjs/config';
import { EnvService } from '../services/env.service';
import { config } from 'dotenv';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
config();

const configService = new ConfigService();
const envService = new EnvService(configService);
export const DataSourceOptions: MysqlConnectionOptions = {
    host: envService.dbHost,
    port: envService.dbPort,
    type: envService.dbType,
    database: envService.dbName,
    username: envService.dbUser,
    password: envService.dbPassword,
    migrations: [__dirname + '/src/typeorm/migrations/*.{js,ts}'],
    entities: [__dirname + '/**/*.entity.{js,ts}'],
    synchronize: false,
};
