import {
    Controller,
    Get,
    Query,
    SerializeOptions,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiCookieAuth,
    ApiUnauthorizedResponse,
    ApiForbiddenResponse,
} from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { IsSuperadminGuard } from '../../shared/guards/is-superadmin.guard';
import { UserQueryDto } from './dto/user-query.dto';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';
import { ProtectedUserFindPresenter } from '../../shared/presenters/find.presenter';

@ApiTags('Адміністрування користувачів (Суперадмін)')
@UseGuards(AuthGuard('jwt'), IsSuperadminGuard)
@Controller()
export class ProtectedUsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Отримання списку всіх користувачів',
        description:
            'Дозволяє суперадміністратору переглядати список всіх користувачів в системі з можливістю фільтрації та пошуку.',
    })
    @ApiOkResponse({
        description: 'Успішно отримано список користувачів',
        type: ProtectedUserFindPresenter,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Тільки суперадміністратори мають доступ до цього ресурсу',
        type: ResponseErrorDto,
    })
    @Get()
    @SerializeOptions({
        type: ProtectedUserFindPresenter,
        excludeExtraneousValues: true,
    })
    async find(
        @Query() query: UserQueryDto,
    ): Promise<{ data: User[]; total: number }> {
        const [users, total] = await this.usersService.find(query);
        return { data: users, ...query, total };
    }
}
