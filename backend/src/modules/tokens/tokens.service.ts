import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from '../../shared/services/env.service';
import { IJwtPayload } from '../auth/interfaces/IJwtPayload';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly jwtService: JwtService,
    private readonly envService: EnvService,
  ) {}
  async create(
    createTokenDto: CreateTokenDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { userId, accessTokenExpiresIn, refreshTokenExpiresIn, jti, role } =
      createTokenDto;
    const payload: IJwtPayload = { userId, jti, role };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.envService.accessSecret,
      expiresIn: this.envService.accessExpiresIn,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.envService.refreshSecret,
      expiresIn: this.envService.refreshExpiresIn,
    });
    const token = this.tokenRepository.create({
      accessToken,
      refreshToken,
      accessTokenExpiresAt: new Date(Date.now() + accessTokenExpiresIn * 1000),
      refreshTokenExpiresAt: new Date(
        Date.now() + refreshTokenExpiresIn * 1000,
      ),
      user: { id: userId },
      jti,
    });
    await this.tokenRepository.save(token);
    return { accessToken, refreshToken };
  }

  async findOneByParams(dto: Partial<Token>): Promise<Token | null> {
    return await this.tokenRepository.findOneBy(dto);
  }
}
