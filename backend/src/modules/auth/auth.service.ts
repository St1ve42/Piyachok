import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CitiesService } from '../cities/cities.service';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from '../../shared/services/env.service';
import { TokensService } from '../tokens/tokens.service';
import { EmailService } from '../email/email.service';
import type { IJwtActionPayload } from './interfaces/IJwtActionPayload';
import { SignInDto } from './dto/sign-in.dto';
import { ResponseUserWithTokensDto } from './dto/response-user-with-tokens.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly cityService: CitiesService,
    private readonly jwtService: JwtService,
    private readonly envService: EnvService,
    private readonly tokenService: TokensService,
    private readonly emailService: EmailService,
  ) {}
  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { email, phone, cityId, regionId } = signUpDto;
    let user = await this.userService.findOneByParams({ email });
    if (user) {
      throw new ConflictException({
        error: 'AUTH_EXISTS',
        message:
          'Користувач з такою електронною адресою вже існує. Спробуйте інакший варіант',
      });
    }
    user = phone ? await this.userService.findOneByParams({ phone }) : null;
    if (user) {
      throw new ConflictException({
        error: 'AUTH_EXISTS',
        message:
          'Користувач з таким телефоном вже існує. Спробуйте інакший варіант',
      });
    }
    const city = await this.cityService.findById(cityId);
    if (!city) {
      throw new NotFoundException({
        error: 'AUTH_NOT_FOUND',
        message: `Не існує міста з id ${cityId}`,
      });
    }
    const isSameRegion = city.regionId === regionId;
    if (!isSameRegion) {
      throw new NotFoundException({
        error: 'AUTH_NOT_FOUND',
        message: `Регіона з айді ${regionId} не знайдено або місто з id ${cityId} не знаходиться в цьому регіоні `,
      });
    }
    const createdUser = await this.userService.create(signUpDto);
    const payload: IJwtActionPayload = {
      userId: createdUser.id,
    };
    const activateToken = this.tokenService.generateAction(payload, 'activate');
    await this.emailService.sendWelcomeEmail(email, activateToken);
    return createdUser;
  }

  async activate(token: string): Promise<ResponseUserWithTokensDto> {
    try {
      const { userId }: { userId: string } = this.jwtService.verify(token, {
        secret: this.envService.activateSecret,
      });
      const user = await this.userService.update(userId, { isActive: true });
      const tokens = await this.tokenService.generate({ user });
      return { user, tokens };
    } catch {
      throw new UnauthorizedException({
        error: 'AUTH_INVALID_TOKEN',
        message: 'Токен є невалідний або його час вичерпався',
      });
    }
  }

  async signIn(signInDto: SignInDto): Promise<ResponseUserWithTokensDto> {
    const { email, password } = signInDto;
    const user = await this.userService.findOneByParams({ email });
    if (!user) {
      throw new UnauthorizedException({
        error: 'AUTH_CREDENTIALS',
        message: 'Неправильний емейл або пароль. Введіть коректні дані.',
      });
    }
    const userPassword = user.password;
    if (!userPassword) {
      throw new UnauthorizedException({
        error: 'AUTH_METHOD_OAUTH',
        message: 'Цей акаунт зареєстрований через соціальні мережі.',
        provider: 'google.com',
      });
    }
    const isValidPassword = await compare(password, userPassword);
    if (!isValidPassword) {
      throw new UnauthorizedException({
        error: 'AUTH_CREDENTIALS',
        message: 'Неправильний емейл або пароль. Введіть коректні дані.',
      });
    }
    const tokens = await this.tokenService.generate({ user });
    return { user, tokens };
  }

  signInWithService(id: number) {
    return `This action removes a #${id} auth`;
  }

  logOut(id: number) {
    return `This action returns a #${id} auth`;
  }

  // logOutAll(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  recoveryRequest(id: number) {
    return `This action removes a #${id} auth`;
  }

  recovery(id: number) {
    return `This action removes a #${id} auth`;
  }

  forgot(id: number) {
    return `This action removes a #${id} auth`;
  }
}
