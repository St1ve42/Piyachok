import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { EnvService } from '../shared/services/env.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (envService: EnvService) => ({
        host: envService.dbHost,
        port: envService.dbPort,
        type: envService.dbType,
        database: envService.dbName,
        username: envService.dbUser,
        password: envService.dbPassword,
        migrations: [__dirname + '/migrations/*.{js,ts}'],
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [EnvService],
    }),
  ],
})
export class TypeormModule {}
