import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvService } from '../../shared/services/env.service';
import { IJwtPayload, IValidatePayload } from './interfaces/IJwtPayload';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokensService } from '../tokens/tokens.service';
import { ErrorResponse } from '../../shared/error/error-response';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService,
        private readonly envService: EnvService,
        private readonly tokenService: TokensService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => req.cookies?.accessToken as string,
            ]),
            ignoreExpiration: false,
            secretOrKey: envService.accessSecret,
        });
    }

    async validate(payload: IJwtPayload): Promise<IValidatePayload> {
        const { userId, ...restPayload } = payload;
        const { jti, isActive, isDeleted, role } = restPayload;
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
        return {
            jti,
            role,
            data: (await this.usersService.findById(
                userId,
                {
                    ownerOf: true,
                },
                { relations: ['ownerOf'] },
            )) as User,
        };
    }
}
