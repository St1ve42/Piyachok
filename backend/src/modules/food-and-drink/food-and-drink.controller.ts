import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
    HttpCode,
    HttpStatus,
    Query,
} from '@nestjs/common';
import { FoodAndDrinkService } from './food-and-drink.service';
import { CreateFoodAndDrinkDto } from './dto/create-food-and-drink.dto';
import { UpdateFoodAndDrinkDto } from './dto/update-food-and-drink.dto';
import { FoodAndDrinkIdValidationPipe } from '../../shared/pipes/id-validation.pipe';
import { FoodAndDrinkBodyValidationPipe } from '../../shared/pipes/body-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import type { IUserRequest } from '../auth/interfaces/IUserRequest';
import { plainToInstance } from 'class-transformer';
import { FoodAndDrinkInfoPresenter } from './presenters/food-and-drink-info.presenter';
import { FoodAndDrinkOwnerInfoPresenter } from './presenters/food-and-drink-owner-info.presenter';
import { FoodAndDrinkQueryDto } from './dto/food-and-drink-query.dto';
import { FoodAndDrinkResponseFindPresenter } from '../../shared/presenters/ResponseFindPresenter';
import { CanManageFoodAndDrinkGuard } from '../../shared/guards/can-manage-food-and-drink.guard';
import { FoodAndDrinkRemoveTagDto } from './dto/food-and-drink-remove-tag.dto';
import { TagsService } from '../tags/tags.service';

@Controller('food-and-drinks')
export class FoodAndDrinkController {
    constructor(
        private readonly foodAndDrinkService: FoodAndDrinkService,
        private readonly tagsService: TagsService,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(
        @Body() createFoodAndDrinkDto: CreateFoodAndDrinkDto,
        @Req() req: IUserRequest,
    ): Promise<FoodAndDrinkOwnerInfoPresenter> {
        const foodAndDrink = await this.foodAndDrinkService.create(
            createFoodAndDrinkDto,
            req.user.fullData,
        );
        return plainToInstance(FoodAndDrinkOwnerInfoPresenter, foodAndDrink, {
            excludeExtraneousValues: true,
        });
    }

    @Get()
    async find(
        @Query() query: FoodAndDrinkQueryDto,
    ): Promise<InstanceType<typeof FoodAndDrinkResponseFindPresenter>> {
        const [foodAndDrinks, total] =
            await this.foodAndDrinkService.find(query);
        return plainToInstance(
            FoodAndDrinkResponseFindPresenter,
            { data: foodAndDrinks, ...query, total },
            {
                excludeExtraneousValues: true,
            },
        );
    }

    @Get(':id')
    async findById(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        id: string,
    ): Promise<FoodAndDrinkInfoPresenter> {
        const foodAndDrink = await this.foodAndDrinkService.findById(id);
        return plainToInstance(FoodAndDrinkInfoPresenter, foodAndDrink, {
            excludeExtraneousValues: true,
        });
    }

    @UseGuards(AuthGuard('jwt'), CanManageFoodAndDrinkGuard)
    @Patch(':id')
    async update(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        id: string,
        @Body() updateFoodAndDrinkDto: UpdateFoodAndDrinkDto,
    ) {
        const foodAndDrink = await this.foodAndDrinkService.update(
            id,
            updateFoodAndDrinkDto,
        );
        return plainToInstance(FoodAndDrinkOwnerInfoPresenter, foodAndDrink, {
            excludeExtraneousValues: true,
        });
    }

    @UseGuards(AuthGuard('jwt'), CanManageFoodAndDrinkGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        id: string,
    ) {
        await this.foodAndDrinkService.delete(id);
    }

    @UseGuards(AuthGuard('jwt'), CanManageFoodAndDrinkGuard)
    @Post(':id/tags/remove')
    @HttpCode(HttpStatus.OK)
    async removeTags(
        @Param(
            'id',
            FoodAndDrinkIdValidationPipe,
            FoodAndDrinkBodyValidationPipe,
        )
        id: string,
        @Body() removeTagsDto: FoodAndDrinkRemoveTagDto,
    ) {
        return await this.tagsService.remove(id, removeTagsDto);
    }
}
