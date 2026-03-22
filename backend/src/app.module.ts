import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './shared/services/env.service';
import { TypeormModule } from './typeorm/typeorm.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { RegionsModule } from './modules/regions/regions.module';
import { CitiesModule } from './modules/cities/cities.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokensModule } from './modules/tokens/tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModule,
    SharedModule,
    UsersModule,
    RegionsModule,
    CitiesModule,
    RolesModule,
    AuthModule,
    TokensModule,
  ],
  controllers: [],
  providers: [EnvService],
})
export class AppModule {}
