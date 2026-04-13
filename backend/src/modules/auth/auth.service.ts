import {
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import { CitiesService } from '../cities/cities.service';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from '../../shared/services/env.service';
import { TokensService } from '../tokens/tokens.service';
import { EmailService } from '../email/email.service';
import type { IJwtActionPayload } from './interfaces/IJwtActionPayload';
import { SignInDto } from './dto/sign-in.dto';
import { ResponseUserWithTokensDto } from './dto/response-user-with-tokens.dto';
import { compare, hash } from 'bcrypt';
import { RecoveryRequestDto } from './dto/recovery-request.dto';
import { ResponseMessageDto } from './dto/response-message.dto';
import { EmailTypeEnum } from '../email/enums/email-type.enum';
import { RecoveryDto } from './dto/recovery.dto';
import { User } from '../users/entities/user.entity';
import { ResponseTokensDto } from './dto/response-tokens.dto';
import { IJwtPayload } from './interfaces/IJwtPayload';
import { ErrorResponse } from '../../shared/error/error-response';
import { ChangePasswordDto } from './dto/change-password.dto';
import { FirebaseService } from '../firebase/firebase.service';
import { ProviderEnum } from '../../shared/enums/provider.enum';
import { ResponseSingInWithService200Dto } from './dto/response-sing-in-with-service-200.dto';
import { ResponseSingInWithService202Dto } from './dto/response-sing-in-with-service-202.dto';
import { SignUpWithServiceDto } from './dto/sign-up-with-service.dto';
import { ActivationResendingDto } from './dto/activation-resending.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly cityService: CitiesService,
        private readonly jwtService: JwtService,
        private readonly envService: EnvService,
        private readonly tokenService: TokensService,
        private readonly emailService: EmailService,
        private readonly firebaseService: FirebaseService,
    ) {}
    async signUp(signUpDto: SignUpDto): Promise<ResponseMessageDto> {
        const { email, phone, cityId, regionId } = signUpDto;
        let user = await this.userService.findOneByParams({ email });
        if (user) {
            throw new ConflictException(
                new ErrorResponse(
                    'AUTH_EXISTS',
                    'Користувач з такою електронною адресою вже існує. Спробуйте інакший варіант.',
                ),
            );
        }
        user = phone ? await this.userService.findOneByParams({ phone }) : null;
        if (user) {
            throw new ConflictException(
                new ErrorResponse(
                    'AUTH_EXISTS',
                    'Користувач з таким телефоном вже існує. Спробуйте інакший варіант.',
                ),
            );
        }
        const city = await this.cityService.findById(cityId);
        if (!city) {
            throw new NotFoundException(
                new ErrorResponse(
                    'AUTH_NOT_FOUND',
                    `Не існує міста з id ${cityId}.`,
                ),
            );
        }
        const isSameRegion = city.regionId === regionId;
        if (!isSameRegion) {
            throw new NotFoundException(
                new ErrorResponse(
                    'AUTH_NOT_FOUND',
                    `Регіона з айді ${regionId} не знайдено або місто з id ${cityId} не знаходиться в цьому регіоні.`,
                ),
            );
        }
        const createdUser = await this.userService.create(signUpDto);
        await this.sendActivationEmail(createdUser);
        return {
            message: `Лист був надісланий на пошту за адресою ${createdUser.email}. Активуйте акаунт за посиланням в ньому.`,
        };
    }

    async signUpWithService(
        signUpWithServiceDto: SignUpWithServiceDto,
    ): Promise<ResponseUserWithTokensDto | ResponseMessageDto> {
        const { isActive, email } = signUpWithServiceDto;
        const isExistsUser = await this.userService.existsBy({ email });
        if (isExistsUser) {
            throw new ConflictException(
                new ErrorResponse(
                    'AUTH_EXISTS',
                    'Користувач з такою електронною адресою вже існує. Спробуйте інакший варіант',
                ),
            );
        }
        const user = await this.userService.create(signUpWithServiceDto);
        if (!isActive) {
            await this.sendActivationEmail(user);
            return {
                message: `Лист був надісланий на пошту за адресою ${email}. Активуйте акаунт за посиланням в ньому`,
            };
        }
        const tokens = await this.tokenService.generate({ user });
        return { user, tokens };
    }

    async activate(token: string): Promise<ResponseUserWithTokensDto> {
        const { userId } = this.tokenService.verify(token, 'activate');
        const user = (await this.userService.findById(userId)) as User;
        console.log(user);
        if (user.isActive) {
            throw new ConflictException(
                new ErrorResponse(
                    'USER_ALREADY_ACTIVE',
                    'Ваш акаунт вже активований.',
                ),
            );
        }
        user.isActive = true;
        await this.userService.save(user);
        const tokens = await this.tokenService.generate({ user });
        return { user, tokens };
    }

    async signIn(signInDto: SignInDto): Promise<ResponseUserWithTokensDto> {
        const { email, password } = signInDto;
        const user = await this.userService.findOneByParams({ email });
        if (!user || user.isDeleted) {
            throw new UnauthorizedException(
                new ErrorResponse(
                    'AUTH_CREDENTIALS',
                    'Неправильний імейл або пароль. Введіть коректні дані.',
                ),
            );
        }
        const userPassword = user.password;
        if (!userPassword) {
            throw new UnauthorizedException(
                new ErrorResponse(
                    'AUTH_METHOD_OAUTH',
                    'Цей акаунт зареєстрований через соціальні мережі.',
                    { provider: 'google.com' },
                ),
            );
        }
        const isValidPassword = await compare(password, userPassword);
        if (!isValidPassword) {
            throw new UnauthorizedException(
                new ErrorResponse(
                    'AUTH_CREDENTIALS',
                    'Неправильний імейл або пароль. Введіть коректні дані.',
                ),
            );
        }
        if (!user.isActive) {
            throw new UnauthorizedException(
                new ErrorResponse(
                    'USER_NOT_ACTIVE',
                    'Ваш акаунт не активований. Будь ласка, активуйте його за посиланням в листі, яке надійшло Вам на пошту під час реєстрації.',
                ),
            );
        }
        const tokens = await this.tokenService.generate({ user });
        return { user, tokens };
    }

    async signInWithService(
        token: string,
    ): Promise<
        ResponseSingInWithService200Dto | ResponseSingInWithService202Dto
    > {
        const {
            email,
            phone_number,
            picture,
            email_verified,
            firebase: { sign_in_provider },
        } = await this.firebaseService.verifyToken(token);
        let user = await this.userService.findOneByParams({ email });
        if (!user) {
            return {
                data: {
                    user: {
                        email: email as string,
                        phone: phone_number,
                        photo: picture,
                        isActive: email_verified,
                        provider: sign_in_provider as ProviderEnum,
                    },
                },
                statusCode: 202,
            };
        }
        const isProviderBelongsToUser = user.providers.includes(
            sign_in_provider as ProviderEnum,
        );
        if (!isProviderBelongsToUser) {
            user.providers.push(sign_in_provider as ProviderEnum);
            user = await this.userService.save(user);
        }
        const tokens = await this.tokenService.generate({ user });
        return {
            data: { user, tokens },
            statusCode: 200,
        };
    }

    async logOut(jti: string): Promise<void> {
        const tokenEntity = await this.tokenService.findOneBy({
            jti,
            isBlocked: false,
        });
        if (tokenEntity) {
            await this.tokenService.update(tokenEntity.id, { isBlocked: true });
        }
    }

    async refreshToken(refreshToken: string): Promise<ResponseTokensDto> {
        const { userId } = this.tokenService.verify(
            refreshToken,
            'refresh',
        ) as IJwtPayload;
        const token = await this.tokenService.findOneBy({
            refreshToken,
            isBlocked: false,
        });
        console.log(token);
        if (!token) {
            throw new UnauthorizedException(
                new ErrorResponse(
                    'AUTH_INVALID_TOKEN',
                    'Токен є невалідний або його час вичерпався',
                ),
            );
        }
        const user = (await this.userService.findById(userId)) as User;
        const tokens = await this.tokenService.generate({ user });
        await this.tokenService.update(token.id, { isBlocked: true });
        return { ...tokens };
    }

    async recoveryRequest(
        dto: RecoveryRequestDto,
    ): Promise<ResponseMessageDto> {
        const { email } = dto;
        const user = await this.userService.findOneByParams({ email });
        if (user) {
            const payload: IJwtActionPayload = { userId: user.id };
            const token = this.tokenService.generateAction(payload, 'recovery');
            await this.emailService.sendEmail(
                EmailTypeEnum.FORGOT_PASSWORD,
                email,
                {
                    name: user.name,
                    token,
                },
            );
        }
        return {
            message:
                'Якщо цей імейл зареєстрований у нашій системі, ми надіслали на нього посилання для відновлення пароля. Будь ласка, перевірте пошту (і папку Спам).',
        };
    }

    async recovery(
        dto: RecoveryDto,
        token: string,
    ): Promise<ResponseUserWithTokensDto> {
        const { userId } = this.tokenService.verify(token, 'recovery');
        const { password } = dto;
        let user = (await this.userService.findOneByParams({
            id: userId,
        })) as User;
        if (user.password) {
            const isSamePassword = await compare(password, user.password);
            if (isSamePassword) {
                throw new ConflictException(
                    new ErrorResponse(
                        'AUTH_PASSWORD_CONFLICT',
                        'Такий пароль вже встановлений для цього акаунту. Будь ласка, вкажіть інакший.',
                    ),
                );
            }
        }
        const hashedPassword = await hash(password, 10);
        user = await this.userService.update(userId, {
            password: hashedPassword,
        });
        const tokens = await this.tokenService.generate({ user });
        return { user, tokens };
    }

    async changePassword(
        dto: ChangePasswordDto,
        userId: string,
    ): Promise<ResponseMessageDto> {
        const { password, oldPassword } = dto;
        const user = (await this.userService.findById(userId)) as User;
        if (!user.password) {
            throw new UnauthorizedException(
                new ErrorResponse(
                    'AUTH_NO_PASSWORD',
                    'Пароль відсутній для цього акаунту, оскільки він зареєстрований через соціальні мережі. Спершу встановіть пароль через опцію "Не пам\'ятаю пароль"',
                ),
            );
        }
        const isCorrectPassword = await compare(oldPassword, user.password);
        if (!isCorrectPassword) {
            throw new ForbiddenException(
                new ErrorResponse(
                    'AUTH_INVALID_PASSWORD',
                    'Неправильний пароль. Будь ласка, вкажіть коректний.',
                ),
            );
        }
        if (password === oldPassword) {
            throw new ConflictException(
                new ErrorResponse(
                    'AUTH_PASSWORD_CONFLICT',
                    'Такий пароль вже встановлений для цього акаунту. Будь ласка, вкажіть інакший.',
                ),
            );
        }
        const hashedPassword = await hash(password, 10);
        await this.userService.update(userId, { password: hashedPassword });
        await this.tokenService.updateBy({ userId }, { isBlocked: true });
        return {
            message:
                'Ваш пароль успішно змінений! Тепер Вам необхідно знову увійти в систему за допомогою нового паролю.',
        };
    }

    async resendActivationEmail(
        dto: ActivationResendingDto,
    ): Promise<ResponseMessageDto> {
        const { email } = dto;
        const user = await this.userService.findOneByParams({ email });
        if (!user) {
            throw new NotFoundException(
                new ErrorResponse(
                    'USER_NOT_FOUND',
                    'Акаунт, привязаний до цієї пошти, не існує. Вам необхідно зареєструватись.',
                ),
            );
        }
        await this.sendActivationEmail(user);
        return {
            message: 'Лист було повторно надіслано на вказаний імейл.',
        };
    }

    private async sendActivationEmail(user: User): Promise<void> {
        const { id, name, email } = user;
        const payload: IJwtActionPayload = {
            userId: id,
        };
        const token = this.tokenService.generateAction(payload, 'activate');
        await this.emailService.sendEmail(EmailTypeEnum.ACTIVATION, email, {
            name,
            token,
        });
    }
}
