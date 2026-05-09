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
import { FoodAndDrinkOwnerInfoPresenter } from '../food-and-drink/presenters/food-and-drink-owner-info.presenter';
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
} from '@nestjs/swagger';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';

@ApiTags('Адміністрування закладів (Суперадмін)')
@UseGuards(AuthGuard('jwt'), IsSuperadminGuard)
@Controller()
export class ProtectedFoodAndDrinkController {
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
    ): Promise<{ data: FoodAndDrink[]; total: number }> {
        const [foodAndDrinks, total] =
            await this.foodAndDrinkService.find(query);
        return { data: foodAndDrinks, ...query, total };
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
    @ApiOkResponse({
        description: 'Статус закладу успішно змінено',
        type: FoodAndDrinkOwnerInfoPresenter,
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
    @HttpCode(HttpStatus.OK)
    @SerializeOptions({
        type: FoodAndDrinkOwnerInfoPresenter,
        excludeExtraneousValues: true,
    })
    async approve(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        id: string,
        @Body()
        superadminFoodAndDrinkStatusDto: SuperadminFoodAndDrinkStatusDto,
    ): Promise<FoodAndDrink> {
        return await this.foodAndDrinkService.setStatus(
            id,
            superadminFoodAndDrinkStatusDto,
        );
    }
}
