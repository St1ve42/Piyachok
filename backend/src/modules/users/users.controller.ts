import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import type { IUserRequest } from '../auth/interfaces/IUserRequest';
import {
    ApiCookieAuth,
    ApiOkResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    //Поки без пагінації
    @ApiOperation({ summary: 'Інформація про всіх користувачів' })
    @ApiOkResponse({
        description: 'Успіх',
        type: [User],
    })
    @Get()
    async find(): Promise<User[]> {
        return await this.usersService.find();
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({ summary: 'Інформація про себе' })
    @ApiOkResponse({
        description: 'Успіх',
        type: User,
    })
    @ApiUnauthorizedResponse({
        description: 'Неавторизований',
        type: ResponseErrorDto,
    })
    @Get('/me')
    @UseGuards(AuthGuard('jwt'))
    async me(@Request() req: IUserRequest): Promise<User> {
        return (await this.usersService.findById(req.user.userId)) as User;
    }
}
