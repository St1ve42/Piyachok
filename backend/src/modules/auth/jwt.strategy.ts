import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvService } from '../../shared/services/env.service';
import { IJwtPayload } from './interfaces/IJwtPayload';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly envService: EnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.accessSecret,
    });
  }
  validate(payload: IJwtPayload): IJwtPayload {
    return payload;
  }
}
