import {
  Controller,
  // Get,
  Post,
  Body,
  Param,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ResponseUserWithTokensDto } from './dto/response-user-with-tokens.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseCheckingEmailDto } from './dto/response-checking-email.dto';
import { ResponseBadRequestErrorDto } from '../../shared/dto/response-bad-request-error.dto';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Реєстрація користувача' })
  @ApiResponse({
    status: 201,
    type: ResponseCheckingEmailDto,
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
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<ResponseCheckingEmailDto> {
    const user = await this.authService.signUp(signUpDto);
    return {
      message: `Лист був надісланий на пошту за адресою ${user.email}. Активуйте акаунт за посиланням в ньому`,
    };
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
  async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<ResponseUserWithTokensDto> {
    return await this.authService.signIn(signInDto);
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
