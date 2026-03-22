import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { EnvService } from './src/shared/services/env.service';
import { DataSource } from 'typeorm';
config();

const configService = new ConfigService();
const envService = new EnvService(configService);
export default new DataSource({
  host: envService.dbHost,
  port: envService.dbPort,
  type: envService.dbType,
  database: envService.dbName,
  username: envService.dbUser,
  password: envService.dbPassword,
  migrations: [__dirname + '/src/typeorm/migrations/*.{js,ts}'],
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  synchronize: false,
});
