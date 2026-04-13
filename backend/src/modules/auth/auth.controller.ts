import {
    Controller,
    Post,
    Body,
    Param,
    HttpCode,
    UseGuards,
    Res,
    Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ResponseUserWithTokensDto } from './dto/response-user-with-tokens.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseMessageDto } from './dto/response-message.dto';
import { ResponseBadRequestErrorDto } from '../../shared/dto/response-bad-request-error.dto';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';
import { RecoveryRequestDto } from './dto/recovery-request.dto';
import type { IUserRequest } from './interfaces/IUserRequest';
import { AuthGuard } from '@nestjs/passport';
import { RecoveryDto } from './dto/recovery.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import type { Request, Response } from 'express';
import { SignUpWithServiceDto } from './dto/sign-up-with-service.dto';
import { cookiesOptionsConst } from './const/cookies-options.const';
import { User } from '../users/entities/user.entity';
import { ResponseSingInWithService200Dto } from './dto/response-sing-in-with-service-200.dto';
import { ResponseTokensDto } from './dto/response-tokens.dto';
import { ActivationResendingDto } from './dto/activation-resending.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Реєстрація користувача' })
    @ApiResponse({
        description: 'Успіх',
        status: 201,
        type: ResponseMessageDto,
    })
    @ApiResponse({
        description: 'Дані не пройшли валідацію',
        status: 400,
        type: ResponseBadRequestErrorDto,
    })
    @ApiResponse({
        description: 'Користувач з такою поштою вже існує',
        status: 409,
        type: ResponseErrorDto,
    })
    @Post('/sign-up')
    async signUp(@Body() signUpDto: SignUpDto): Promise<ResponseMessageDto> {
        return await this.authService.signUp(signUpDto);
    }

    @Post('/sign-up/service')
    async signUpWithService(
        @Body() signUpWithServiceDto: SignUpWithServiceDto,
    ): Promise<ResponseUserWithTokensDto | ResponseMessageDto> {
        return await this.authService.signUpWithService(signUpWithServiceDto);
    }

    @ApiOperation({ summary: 'Активація користувача' })
    @ApiResponse({
        description: 'Дані не пройшли валідацію',
        status: 200,
        type: ResponseUserWithTokensDto,
    })
    @ApiResponse({
        description: 'Невалідний токен або його час вичерпався',
        status: 401,
        type: ResponseErrorDto,
    })
    @Post('/activate/:token')
    @HttpCode(200)
    async activate(
        @Param('token') token: string,
        @Res({ passthrough: true }) res: Response,
    ): Promise<User> {
        const { user, tokens } = await this.authService.activate(token);
        this.setCookies(res, tokens);
        return user;
    }

    @ApiOperation({ summary: 'Вхід в систему за допомогою емейлу та пароля' })
    @ApiResponse({
        description: 'Успіх',
        status: 200,
        type: ResponseUserWithTokensDto,
    })
    @ApiResponse({
        description: 'Дані не пройшли валідацію',
        status: 400,
        type: ResponseErrorDto,
    })
    @ApiResponse({
        description: 'Неправильний імейл або пароль',
        status: 401,
        type: ResponseErrorDto,
    })
    @Post('/sign-in')
    @HttpCode(200)
    async signIn(
        @Body() signInDto: SignInDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<User> {
        const { user, tokens } = await this.authService.signIn(signInDto);
        this.setCookies(res, tokens);
        return user;
    }
    @ApiOperation({ summary: 'Запит на відновлення паролю' })
    @ApiResponse({
        description: 'Успіх',
        status: 200,
        type: ResponseMessageDto,
    })
    @ApiResponse({
        description: 'Дані не пройшли валідацію',
        status: 400,
        type: ResponseErrorDto,
    })
    @Post('/password/recovery')
    @HttpCode(200)
    async recoveryRequest(
        @Body() dto: RecoveryRequestDto,
    ): Promise<ResponseMessageDto> {
        return await this.authService.recoveryRequest(dto);
    }

    @ApiOperation({ summary: 'Відновлення паролю' })
    @ApiResponse({
        description: 'Успіх',
        status: 200,
        type: User,
    })
    @ApiResponse({
        description: 'Дані не пройшли валідацію',
        status: 400,
        type: ResponseErrorDto,
    })
    @ApiResponse({
        description: 'Невалідний токен або його час вичерпався',
        status: 401,
        type: ResponseErrorDto,
    })
    @ApiResponse({
        description: 'Паролі збігаються',
        status: 409,
        type: ResponseErrorDto,
    })
    @Post('/password/recovery/:token')
    @HttpCode(200)
    async recovery(
        @Param('token') token: string,
        @Body() dto: RecoveryDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<User> {
        const { user, tokens } = await this.authService.recovery(dto, token);
        this.setCookies(res, tokens);
        return user;
    }

    @ApiOperation({ summary: 'Вихід зі системи' })
    @ApiResponse({
        description: 'Успіх',
        status: 204,
    })
    @ApiResponse({
        description: 'Невалідний токен або його час вичерпався',
        status: 401,
        type: ResponseErrorDto,
    })
    @Post('/log-out')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(204)
    async logOut(@Req() req: IUserRequest): Promise<void> {
        const { jti } = req.user;
        await this.authService.logOut(jti);
    }

    @ApiOperation({ summary: 'Створення нової пари токенів' })
    @ApiResponse({
        description: 'Успіх',
        status: 204,
    })
    @ApiResponse({
        description: 'Невалідний токен або його час вичерпався',
        status: 401,
        type: ResponseErrorDto,
    })
    @Post('/refresh')
    @HttpCode(204)
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<void> {
        const refreshToken = req.cookies.refreshToken as string;
        const tokens = await this.authService.refreshToken(refreshToken);
        this.setCookies(res, tokens);
    }

    @ApiOperation({ summary: 'Зміна паролю' })
    @ApiResponse({
        description: 'Успіх',
        status: 200,
        type: ResponseMessageDto,
    })
    @ApiResponse({
        description: 'Дані не пройшли валідацію',
        status: 400,
        type: ResponseErrorDto,
    })
    @ApiResponse({
        description: 'Користувач залогінений за допомогою сервісів',
        status: 401,
        type: ResponseErrorDto,
    })
    @ApiResponse({
        description: 'Старий пароль та пароль користувача не збігаються',
        status: 403,
        type: ResponseErrorDto,
    })
    @ApiResponse({
        description: 'Новий пароль збігається зі старим',
        status: 409,
        type: ResponseErrorDto,
    })
    @Post('/password/change')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(200)
    async change(
        @Body() dto: ChangePasswordDto,
        @Req() req: IUserRequest,
    ): Promise<ResponseMessageDto> {
        return await this.authService.changePassword(dto, req.user.userId);
    }

    @Post('/sign-in/service/:token')
    async signInWithService(
        @Param('token') token: string,
        @Res({ passthrough: true }) res: Response,
    ): Promise<any> {
        const result: { data: any; statusCode: number } =
            await this.authService.signInWithService(token);
        if (result instanceof ResponseSingInWithService200Dto) {
            const tokens = result.data.tokens;
            this.setCookies(res, tokens);
        }
        res.status(result.statusCode);
        return result instanceof ResponseSingInWithService200Dto
            ? result.data.user
            : result.data;
    }

    @ApiOperation({ summary: 'Надсилання повторного активаційного листа' })
    @ApiResponse({
        description: 'Успіх',
        status: 200,
        type: ResponseMessageDto,
    })
    @ApiResponse({
        description: 'Дані не пройшли валідацію',
        status: 400,
        type: ResponseErrorDto,
    })
    @ApiResponse({
        description: 'Користувача не знайдено',
        status: 404,
        type: ResponseErrorDto,
    })
    @Post('/activation/resend')
    async activationResending(
        @Body() dto: ActivationResendingDto,
    ): Promise<ResponseMessageDto> {
        return await this.authService.resendActivationEmail(dto);
    }

    private setCookies(res: Response, tokens: ResponseTokensDto): void {
        res.cookie('accessToken', tokens.accessToken, cookiesOptionsConst);
        res.cookie('refreshToken', tokens.refreshToken, cookiesOptionsConst);
    }
}
