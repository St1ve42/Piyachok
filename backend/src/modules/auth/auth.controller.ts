import {
  Controller,
  // Get,
  Post,
  Body,
  Param,
  HttpCode,
  Request,
  UseGuards,
  Res,
  // Patch,
  // Param,
  // Delete,
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
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResponseTokensDto } from './dto/response-tokens.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import type { Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { SignUpWithServiceDto } from './dto/sign-up-with-service.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Реєстрація користувача' })
  @ApiResponse({
    status: 201,
    type: ResponseMessageDto,
  })
  @ApiResponse({
    status: 400,
    type: ResponseBadRequestErrorDto,
  })
  @ApiResponse({
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
    status: 200,
    type: ResponseUserWithTokensDto,
  })
  @ApiResponse({
    status: 401,
    type: ResponseErrorDto,
  })
  @Post('/activate/:token')
  @HttpCode(200)
  async activate(
    @Param('token') token: string,
  ): Promise<ResponseUserWithTokensDto> {
    return await this.authService.activate(token);
  }

  @ApiOperation({ summary: 'Вхід в систему за допомогою емейлу та пароля' })
  @ApiResponse({
    status: 200,
    type: ResponseUserWithTokensDto,
  })
  @ApiResponse({
    status: 401,
    type: ResponseErrorDto,
  })
  @Post('/sign-in')
  @HttpCode(200)
  async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<ResponseUserWithTokensDto> {
    return await this.authService.signIn(signInDto);
  }

  @Post('/password/recovery')
  @HttpCode(200)
  async recoveryRequest(
    @Body() dto: RecoveryRequestDto,
  ): Promise<ResponseMessageDto> {
    return await this.authService.recoveryRequest(dto);
  }

  @Post('/password/recovery/:token')
  @HttpCode(200)
  async recovery(
    @Param('token') token: string,
    @Body() dto: RecoveryDto,
  ): Promise<ResponseUserWithTokensDto> {
    return await this.authService.recovery(dto, token);
  }

  @Post('/log-out')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  async logOut(@Request() req: IUserRequest): Promise<void> {
    const { jti } = req.user;
    await this.authService.logOut(jti);
  }

  @Post('/refresh')
  @HttpCode(200)
  async refresh(@Body() dto: RefreshTokenDto): Promise<ResponseTokensDto> {
    return await this.authService.refreshToken(dto);
  }

  @Post('/password/change')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  async change(
    @Body() dto: ChangePasswordDto,
    @Request() req: IUserRequest,
  ): Promise<ResponseMessageDto> {
    return await this.authService.changePassword(dto, req.user.userId);
  }

  @Post('/sign-in/service/:token')
  async signInWithService(
    @Param('token') token: string,
    @Res() res: Response,
  ): Promise<void> {
    const result: { data: any; statusCode: number } =
      await this.authService.signInWithService(token);
    res
      .status(result.statusCode)
      .json({ ...instanceToPlain(result.data), statusCode: result.statusCode });
  }
}
