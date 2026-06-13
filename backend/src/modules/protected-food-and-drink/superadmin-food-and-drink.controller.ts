import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query,
    SerializeOptions,
    UseGuards,
} from '@nestjs/common';
import { FoodAndDrinkService } from '../food-and-drink/food-and-drink.service';
import { ProtectedFoodAndDrinkFindPresenter } from '../../shared/presenters/find.presenter';
import { SuperadminFoodAndDrinkQueryDto } from './dto/superadmin-food-and-drink-query.dto';
import { FoodAndDrinkIdValidationPipe } from '../../shared/pipes/id-validation.pipe';
import { FoodAndDrinkBodyValidationPipe } from '../../shared/pipes/body-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { IsSuperadminGuard } from '../../shared/guards/is-superadmin.guard';
import { FoodAndDrink } from '../food-and-drink/entities/food-and-drink.entity';
import { SuperadminFoodAndDrinkStatusDto } from './dto/superadmin-food-and-drink-status.dto';
import {
    ApiTags,
    ApiOperation,
    ApiOkResponse,
    ApiParam,
    ApiUnauthorizedResponse,
    ApiForbiddenResponse,
    ApiCookieAuth,
    ApiNotFoundResponse,
    ApiNoContentResponse,
    ApiConflictResponse,
} from '@nestjs/swagger';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';
import { SuperadminFoodAndDrinkBindOwnershipDto } from './dto/superadmin-food-and-drink-bind-ownership.dto';
import { SuperadminFoodAndDrinkInfoPresenter } from './presenters/superadmin-food-and-drink-info-presenter';

@ApiTags('Адміністрування закладів (Суперадмін)')
@UseGuards(AuthGuard('jwt'), IsSuperadminGuard)
@Controller()
export class SuperadminFoodAndDrinkController {
    constructor(private foodAndDrinkService: FoodAndDrinkService) {}

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Отримання списку всіх закладів (для адміністрування)',
        description:
            'Дозволяє суперадміністратору переглядати та фільтрувати всі заклади харчування в системі, включаючи неактивні.',
    })
    @ApiOkResponse({
        description: 'Успішно отримано список закладів',
        type: ProtectedFoodAndDrinkFindPresenter,
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
        type: ProtectedFoodAndDrinkFindPresenter,
        excludeExtraneousValues: true,
    })
    async find(
        @Query() query: SuperadminFoodAndDrinkQueryDto,
    ): Promise<{ data: FoodAndDrink[]; total: number; totalPages: number }> {
        const [foodAndDrinks, total, totalPages] =
            await this.foodAndDrinkService.find(query);
        return { data: foodAndDrinks, ...query, total, totalPages };
    }

    @ApiOperation({
        summary: 'Отримання інформації',
        description:
            'Отримує детальну інформацію про конкретний заклад харчування за його ідентифікатором.',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор закладу',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiOkResponse({
        description: 'Успішно отримано інформацію про заклад',
        type: SuperadminFoodAndDrinkInfoPresenter,
    })
    @ApiNotFoundResponse({
        description: 'Заклад не знайдено',
        type: ResponseErrorDto,
    })
    @Get(':id')
    @SerializeOptions({
        type: SuperadminFoodAndDrinkInfoPresenter,
        excludeExtraneousValues: true,
    })
    async findById(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        id: string,
    ): Promise<FoodAndDrink> {
        return (await this.foodAndDrinkService.findById(id, {
            owner: true,
        })) as FoodAndDrink;
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Зміна статусу закладу',
        description:
            'Дозволяє суперадміністратору змінити статус закладу (активний/неактивний). Це необхідно для схвалення нових закладів.',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор закладу',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiNoContentResponse({
        description: 'Статус закладу успішно змінено',
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Тільки суперадміністратори мають доступ до цього ресурсу',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Заклад не знайдено',
        type: ResponseErrorDto,
    })
    @Post(':id/status')
    @HttpCode(HttpStatus.NO_CONTENT)
    async setStatus(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        id: string,
        @Body()
        superadminFoodAndDrinkStatusDto: SuperadminFoodAndDrinkStatusDto,
    ): Promise<void> {
        await this.foodAndDrinkService.setStatus(
            id,
            superadminFoodAndDrinkStatusDto,
        );
    }

    @ApiCookieAuth('accessToken')
    @ApiOperation({
        summary: 'Зміна власника закладу',
        description: 'Дозволяє суперадміністратору змінити власника закладу.',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID ідентифікатор закладу',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiNoContentResponse({
        description: 'Власника закладу успішно змінено',
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Тільки суперадміністратори мають доступ до цього ресурсу',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Заклад не знайдено',
        type: ResponseErrorDto,
    })
    @ApiConflictResponse({
        description: 'Користувач вже є власником інакшого або свого закладу',
        type: ResponseErrorDto,
    })
    @Post(':id/bind-ownership')
    @HttpCode(HttpStatus.NO_CONTENT)
    async bindOwnership(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        id: string,
        @Body()
        superadminFoodAndDrinkBindOwnershipDto: SuperadminFoodAndDrinkBindOwnershipDto,
    ): Promise<void> {
        await this.foodAndDrinkService.bindOwnership(
            id,
            superadminFoodAndDrinkBindOwnershipDto,
        );
    }
}
