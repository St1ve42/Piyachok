import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    HttpCode,
    HttpStatus,
    SerializeOptions,
} from '@nestjs/common';
import { FoodAndDrinkCategoryService } from './food-and-drink-category.service';
import { CreateFoodAndDrinkTopCategoryDto } from './dto/create-food-and-drink-top-category.dto';
import { QueryFoodAndDrinkTopCategoryDto } from './dto/query-food-and-drink-top-category.dto';
import { UpdateFoodAndDrinkTopCategoryDto } from './dto/update-food-and-drink-top-category.dto';
import { FoodAndDrinkTopCategory } from './entities/food-and-drink-top-category.entity';
import { AuthGuard } from '@nestjs/passport';
import { IsSuperadminGuard } from '../../shared/guards/is-superadmin.guard';
import { CategoryIdValidationPipe } from '../../shared/pipes/id-validation.pipe';
import { CategoryBodyValidationPipe } from '../../shared/pipes/body-validation.pipe';
import { AddFoodAndDrinkDto } from './dto/add-food-and-drink.dto';
import { RemoveFoodAndDrinkDto } from './dto/remove-food-and-drink.dto';
import { QueryBaseDto } from '../../shared/dto/query-base.dto';
import { FoodAndDrinkService } from '../food-and-drink/food-and-drink.service';
import { FoodAndDrink } from '../food-and-drink/entities/food-and-drink.entity';
import {
    FoodAndDrinkByCategoryFindPresenter,
    FoodAndDrinkTopCategoriesFindPresenter,
} from '../../shared/presenters/find.presenter';
import {
    ApiTags,
    ApiOperation,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiNoContentResponse,
    ApiParam,
    ApiBody,
    ApiQuery,
    ApiUnauthorizedResponse,
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiConflictResponse,
} from '@nestjs/swagger';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';
import { ResponseBadRequestErrorDto } from '../../shared/dto/response-bad-request-error.dto';
import { FoodAndDrinkTopCategoryPresenter } from './presenters/FoodAndDrinkTopCategoryPresenter';

@ApiTags('Категорії закладів харчування')
@Controller()
@UseGuards(AuthGuard('jwt'), IsSuperadminGuard)
export class FoodAndDrinkTopCategoryController {
    constructor(
        private readonly foodAndDrinkCategoriesService: FoodAndDrinkCategoryService,
        private readonly foodAndDrinkService: FoodAndDrinkService,
    ) {}

    @ApiOperation({
        summary: 'Створення',
        description: 'Створення нової категорії закладів харчування',
    })
    @ApiCreatedResponse({
        description: 'Категорія успішно створена',
        type: FoodAndDrinkTopCategoryPresenter,
    })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Заборонено',
        type: ResponseErrorDto,
    })
    @ApiConflictResponse({
        description: 'Топ-категорія з такою назвою вже існує',
        type: ResponseErrorDto,
    })
    @Post()
    create(
        @Body() createDto: CreateFoodAndDrinkTopCategoryDto,
    ): Promise<Partial<FoodAndDrinkTopCategory>> {
        return this.foodAndDrinkCategoriesService.create(createDto);
    }

    @ApiOperation({
        summary: 'Пошук',
        description: 'Отримати список категорій з фільтрацією',
    })
    @ApiOkResponse({
        description: 'Список категорій',
        type: FoodAndDrinkTopCategoriesFindPresenter,
    })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Заборонено',
        type: ResponseErrorDto,
    })
    @ApiQuery({
        name: 'name',
        required: false,
        description: 'Назва категорії',
        example: 'Сніданки',
    })
    @Get()
    find(@Query() query: QueryFoodAndDrinkTopCategoryDto): Promise<{
        data: FoodAndDrinkTopCategory[];
        total: number;
        totalPages: number;
    }> {
        return this.foodAndDrinkCategoriesService.find(query);
    }

    @ApiOperation({ summary: 'Оновлення', description: 'Оновити категорію' })
    @ApiNoContentResponse({ description: 'Категорія оновлена' })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Не знайдено топ-категорію',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Заборонено',
        type: ResponseErrorDto,
    })
    @ApiConflictResponse({
        description: 'Топ-категорія з такою назвою вже існує',
        type: ResponseErrorDto,
    })
    @ApiParam({
        name: 'id',
        description: 'ID категорії',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    update(
        @Param('id', CategoryIdValidationPipe, CategoryBodyValidationPipe)
        id: string,
        @Body() updateDto: UpdateFoodAndDrinkTopCategoryDto,
    ): Promise<void> {
        return this.foodAndDrinkCategoriesService.update(id, updateDto);
    }

    @ApiOperation({ summary: 'Видалення', description: 'Видалити категорію' })
    @ApiNoContentResponse({ description: 'Категорія видалена' })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Заборонено',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Не знайдено топ-категорію',
        type: ResponseErrorDto,
    })
    @ApiParam({
        name: 'id',
        description: 'ID категорії',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(
        @Param('id', CategoryIdValidationPipe, CategoryBodyValidationPipe)
        id: string,
    ): Promise<void> {
        return this.foodAndDrinkCategoriesService.delete(id);
    }

    @ApiOperation({
        summary: 'Додати заклад',
        description: 'Додати заклад до категорії',
    })
    @ApiParam({
        name: 'id',
        description: 'ID категорії',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @ApiBody({ type: AddFoodAndDrinkDto })
    @ApiNoContentResponse({ description: 'Заклад додано до категорії' })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Заборонено',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Не знайдено топ-категорію',
        type: ResponseErrorDto,
    })
    @ApiConflictResponse({
        description: 'Заклад вже є в категорії',
        type: ResponseErrorDto,
    })
    @Post(':id/add-food-and-drink')
    @HttpCode(HttpStatus.NO_CONTENT)
    async addFoodAndDrink(
        @Param('id', CategoryIdValidationPipe, CategoryBodyValidationPipe)
        categoryId: string,
        @Body() addFoodAndDrinkDto: AddFoodAndDrinkDto,
    ): Promise<void> {
        await this.foodAndDrinkCategoriesService.addFoodAndDrink(
            categoryId,
            addFoodAndDrinkDto,
        );
    }

    @ApiOperation({
        summary: 'Видалити заклад з категорії',
        description: 'Видалити асоціацію закладу з категорією',
    })
    @ApiParam({
        name: 'id',
        description: 'ID категорії',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @ApiBody({ type: RemoveFoodAndDrinkDto })
    @ApiNoContentResponse({ description: 'Заклад видалено з категорії' })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Заборонено',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Не знайдено топ-категорію',
        type: ResponseErrorDto,
    })
    @ApiConflictResponse({
        description: 'Закладу немає в категорії',
        type: ResponseErrorDto,
    })
    @Post(':id/remove-food-and-drink')
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeFoodAndDrink(
        @Param('id', CategoryIdValidationPipe, CategoryBodyValidationPipe)
        categoryId: string,
        @Body() removeFoodAndDrinkDto: RemoveFoodAndDrinkDto,
    ): Promise<void> {
        await this.foodAndDrinkCategoriesService.removeFoodAndDrink(
            categoryId,
            removeFoodAndDrinkDto,
        );
    }

    @ApiOperation({
        summary: 'Отримати заклади за категорією',
        description:
            'Отримати список закладів, що належать до вказаної топ-категорії',
    })
    @ApiOkResponse({
        description: 'Список закладів за категорією',
        type: FoodAndDrinkByCategoryFindPresenter,
    })
    @SerializeOptions({
        type: FoodAndDrinkByCategoryFindPresenter,
        excludeExtraneousValues: true,
    })
    @Get(':id/food-and-drinks')
    async findFoodAndDrinks(
        @Param('id', CategoryIdValidationPipe, CategoryBodyValidationPipe)
        categoryId: string,
        @Query() query: QueryBaseDto,
    ): Promise<{
        data: { topCategory: string; foodAndDrinks: FoodAndDrink[] };
        total: number;
        totalPages: number;
    }> {
        const [foodAndDrinks, total, totalPages] =
            await this.foodAndDrinkService.find(query, {
                topCategories: { id: categoryId },
            });
        const { name } = (await this.foodAndDrinkCategoriesService.findById(
            categoryId,
        )) as FoodAndDrinkTopCategory;
        return {
            data: { topCategory: name, foodAndDrinks },
            total,
            totalPages,
            ...query,
        };
    }
}
