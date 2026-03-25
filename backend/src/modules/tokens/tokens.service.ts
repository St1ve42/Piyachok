import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from '../../shared/services/env.service';
import { IJwtPayload } from '../auth/interfaces/IJwtPayload';
import { ITokens } from '../auth/interfaces/ITokens';
import { IJwtActionPayload } from '../auth/interfaces/IJwtActionPayload';

@Injectable()
export class TokensService {
  private readonly accessExpiresIn: number;
  private readonly refreshExpiresIn: number;

  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly jwtService: JwtService,
    private readonly envService: EnvService,
  ) {}
  async generate(createTokenDto: CreateTokenDto): Promise<ITokens> {
    const { user } = createTokenDto;
    const jti = Math.random().toString(36).substring(2);
    const payload: IJwtPayload = { userId: user.id, jti, role: user.role.name };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.envService.accessSecret,
      expiresIn: `${this.envService.accessExpiresIn}s`,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.envService.refreshSecret,
      expiresIn: `${this.envService.refreshExpiresIn}`,
    });
    const token = this.tokenRepository.create({
      accessToken,
      refreshToken,
      accessTokenExpiresAt: new Date(
        Date.now() + this.envService.accessExpiresIn * 1000,
      ),
      refreshTokenExpiresAt: new Date(
        Date.now() + this.envService.refreshExpiresIn * 1000,
      ),
      user,
      jti,
    });
    await this.tokenRepository.save(token);
    return { accessToken, refreshToken };
  }

  generateAction(
    payload: IJwtActionPayload,
    type: 'activate' | 'recovery',
  ): string {
    let secret: string;
    let expiresIn: number;
    switch (type) {
      case 'activate':
        secret = this.envService.activateSecret;
        expiresIn = this.envService.activateExpiresIn;
        break;
      case 'recovery':
        secret = this.envService.recoverySecret;
        expiresIn = this.envService.recoveryExpiresIn;
    }
    return this.jwtService.sign(payload, {
      secret,
      expiresIn: `${expiresIn}s`,
    });
  }

  async findOneByParams(dto: Partial<Token>): Promise<Token | null> {
    return await this.tokenRepository.findOneBy(dto);
  }
}
