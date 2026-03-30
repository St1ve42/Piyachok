import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvService } from '../../shared/services/env.service';
import { IJwtPayload } from './interfaces/IJwtPayload';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokensService } from '../tokens/tokens.service';
import { ErrorResponse } from '../../shared/error/error-response';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly envService: EnvService,
    private readonly tokenService: TokensService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.accessSecret,
    });
  }
  async validate(payload: IJwtPayload): Promise<IJwtPayload> {
    const { jti, isActive, isDeleted } = payload;
    const isExistsToken = await this.tokenService.isExistsBy({
      jti,
      isBlocked: false,
    });
    if (!isExistsToken) {
      throw new UnauthorizedException(
        new ErrorResponse(
          'AUTH_INVALID_TOKEN',
          'Невалідний токен або його час вичерпався',
        ),
      );
    }
    if (!isActive) {
      throw new UnauthorizedException(
        new ErrorResponse(
          'USER_NOT_ACTIVE',
          'Ваш акаунт не активований. Будь ласка, активуйте його за посиланням в листі, яке надійшло Вам на пошту під час реєстрації.',
        ),
      );
    }
    if (isDeleted) {
      throw new UnauthorizedException(
        new ErrorResponse(
          'USER_IS_DELETED',
          'Для здійснення цієї дії, Вам необхідно увійти в систему',
        ),
      );
    }
    return payload;
  }
}
