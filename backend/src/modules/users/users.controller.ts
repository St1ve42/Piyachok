import {
    Controller,
    Get,
    UseGuards,
    Request,
    Body,
    Patch,
    Delete,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import type { IUserRequest } from '../auth/interfaces/IUserRequest';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiCookieAuth,
    ApiForbiddenResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';
import { ResponseBadRequestErrorDto } from '../../shared/dto/response-bad-request-error.dto';
import { UpdateMeDto } from './dto/update-me.dto';
import { FoodAndDrinkService } from '../food-and-drink/food-and-drink.service';
import { FoodAndDrink } from '../food-and-drink/entities/food-and-drink.entity';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly foodAndDrinkService: FoodAndDrinkService,
    ) {}

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
    me(@Request() req: IUserRequest): User {
        return req.user.data;
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({ summary: 'Оновити інформацію про себе' })
    @ApiOkResponse({
        description: 'Успіх',
        type: User,
    })
    @ApiBadRequestResponse({
        description: 'Помилка валідації',
        type: ResponseBadRequestErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Неавторизований',
        type: ResponseErrorDto,
    })
    @ApiConflictResponse({
        description: 'Конфлікт даних',
        type: ResponseErrorDto,
    })
    @Patch('/me')
    @UseGuards(AuthGuard('jwt'))
    async updateMe(
        @Request() req: IUserRequest,
        @Body() updateMeDto: UpdateMeDto,
    ): Promise<User> {
        const user = req.user.data;
        return await this.usersService.updateByEntity(user, updateMeDto);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({ summary: 'Видалити акаунт' })
    @ApiNoContentResponse({
        description: 'Успіх',
    })
    @ApiUnauthorizedResponse({
        description: 'Неавторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Заборонено',
        type: ResponseErrorDto,
    })
    @Delete('/me')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard('jwt'))
    async deleteMe(@Request() req: IUserRequest): Promise<void> {
        const user = req.user;
        await this.usersService.softDeleteById(user.data.id, user.role);
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({ summary: 'Отримати інформацію про свій заклад' })
    @ApiOkResponse({
        description: 'Успіх',
    })
    @ApiUnauthorizedResponse({
        description: 'Неавторизований',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Не знайдено',
        type: ResponseErrorDto,
    })
    @Get('/me/food-and-drink')
    @UseGuards(AuthGuard('jwt'))
    async myFoodAndDrink(@Request() req: IUserRequest): Promise<FoodAndDrink> {
        const user = req.user;
        return await this.foodAndDrinkService.findOneByOwner(user.data);
    }
}
