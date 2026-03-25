import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SharedModule } from '../../shared/shared.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { TokensModule } from '../tokens/tokens.module';
import { CitiesModule } from '../cities/cities.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    SharedModule,
    JwtModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    TokensModule,
    CitiesModule,
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
