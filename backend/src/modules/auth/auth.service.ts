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
import { SignUpWithServiceTestDto } from './dto/sign-up-with-service.dto';
import { ActivationResendingDto } from './dto/activation-resending.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

//TODO backend joins

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly cityService: CitiesService,
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
        await this.sendActivationEmail(createdUser, email);
        return {
            message: `Лист був надісланий на пошту за адресою ${createdUser.email}. Активуйте акаунт за посиланням в ньому.`,
        };
    }

    async signUpWithSocialNetwork(
        signUpWithServiceTestDto: SignUpWithServiceTestDto,
        token: string,
    ): Promise<ResponseUserWithTokensDto> {
        const payload = await this.firebaseService.verifyToken(token);
        const createUserDto: CreateUserDto = {
            name: payload.name?.split(' ')[0] ?? signUpWithServiceTestDto.name,
            surname:
                payload.name?.split(' ')[1] ?? signUpWithServiceTestDto.surname,
            age: signUpWithServiceTestDto.age,
            regionId: signUpWithServiceTestDto.regionId,
            cityId: signUpWithServiceTestDto.cityId,
            email: payload.email,
            phone: payload.phone_number,
            photo: payload.picture,
            firebaseUid: payload.uid,
            provider: payload.firebase.sign_in_provider as ProviderEnum,
            isActive: payload.email_verified ?? false,
            isVerified: payload.email_verified ?? false,
        };
        const user = await this.userService.create(createUserDto);
        const tokens = await this.tokenService.generate({ user });
        return { user, tokens };
    }

    async activate(token: string): Promise<ResponseUserWithTokensDto> {
        const { userId } = this.tokenService.verify(token, 'activate');
        const user = (await this.userService.findById(userId)) as User;
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
                    "Неправильний імейл або пароль. Введіть коректні дані. Якщо Ви раніше входили через соціальну мережу, то встановіть пароль через форму 'Забули пароль?'",
                ),
            );
        }
        const userPassword = user.password;
        if (!userPassword) {
            throw new UnauthorizedException(
                new ErrorResponse(
                    'AUTH_METHOD_OAUTH',
                    "Неправильний імейл або пароль. Введіть коректні дані. Якщо Ви раніше входили через соціальну мережу, то встановіть пароль через форму 'Забули пароль?'",
                    { provider: 'google.com' },
                ),
            );
        }
        const isValidPassword = await compare(password, userPassword);
        if (!isValidPassword) {
            throw new UnauthorizedException(
                new ErrorResponse(
                    'AUTH_CREDENTIALS',
                    "Неправильний імейл або пароль. Введіть коректні дані. Якщо Ви раніше входили через соціальну мережу, то встановіть пароль через форму 'Забули пароль?'",
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

    async signInWithSocialNetwork(
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
            uid,
            name,
        } = await this.firebaseService.verifyToken(token);
        const payload = await this.firebaseService.verifyToken(token);
        console.log(payload);
        const userByUid = await this.userService.findOneByParams({
            firebaseUid: uid,
        });
        //Якщо користувач вже входив через соціальні мережі
        if (userByUid) {
            return await this.saveUserAndGenerateTokens(
                userByUid,
                sign_in_provider,
            );
        }
        //Спроба знайти користувача за імейлом за наявності
        if (email && email_verified) {
            const userByEmail = await this.userService.findOneByParams({
                email,
            });
            if (userByEmail) {
                if (!userByEmail.isActive) {
                    userByEmail.password = undefined;
                    userByEmail.providers = userByEmail.providers.filter(
                        (p) => p !== ProviderEnum.LOCAL,
                    );
                }

                userByEmail.firebaseUid = uid;
                userByEmail.isActive = true;
                userByEmail.isVerified = true;
                userByEmail.phone ??= phone_number;
                userByEmail.photo ??= picture;

                return await this.saveUserAndGenerateTokens(
                    userByEmail,
                    sign_in_provider,
                );
            }
        }
        //В інакшому випадку повернення частини даних для продовження реєстрації
        return {
            data: {
                name: name as string,
                email: email as string,
                phone: phone_number,
                photo: picture,
                isActive: email_verified,
                provider: sign_in_provider as ProviderEnum,
                firebaseUid: uid,
            },
            statusCode: 202,
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
        await this.sendActivationEmail(user, email);
        return {
            message: 'Лист було повторно надіслано на вказаний імейл.',
        };
    }

    private async sendActivationEmail(
        user: User,
        email: string,
    ): Promise<void> {
        const { id, name } = user;
        const payload: IJwtActionPayload = {
            userId: id,
        };
        const token = this.tokenService.generateAction(payload, 'activate');
        await this.emailService.sendEmail(EmailTypeEnum.ACTIVATION, email, {
            name,
            token,
        });
    }

    //Додавання провайдера в список провайдерів користувача та видача токенів
    private async saveUserAndGenerateTokens(
        user: User,
        sign_in_provider: string,
    ): Promise<ResponseSingInWithService200Dto> {
        const isProviderBelongsToUser = user.providers.includes(
            sign_in_provider as ProviderEnum,
        );
        if (!isProviderBelongsToUser) {
            user.providers.push(sign_in_provider as ProviderEnum);
        }
        user = await this.userService.save(user);
        const tokens = await this.tokenService.generate({
            user,
        });
        return {
            data: { user, tokens },
            statusCode: 200,
        };
    }
}
