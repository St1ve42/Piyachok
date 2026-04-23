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
} from '@nestjs/common';
import { FoodAndDrinkService } from './food-and-drink.service';
import { CreateFoodAndDrinkDto } from './dto/create-food-and-drink.dto';
import { UpdateFoodAndDrinkDto } from './dto/update-food-and-drink.dto';
import { FoodAndDrinkIdValidationPipe } from '../../shared/pipes/id-validation.pipe';
import { FoodAndDrinkBodyValidationPipe } from '../../shared/pipes/body-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import type { IUserRequest } from '../auth/interfaces/IUserRequest';
import { FoodAndDrinkListPresenter } from './presenters/food-and-drink-list.presenter';
import { plainToInstance } from 'class-transformer';
import { FoodAndDrinkInfoPresenter } from './presenters/food-and-drink-info.presenter';
import { FoodAndDrinkOwnerInfoPresenter } from './presenters/food-and-drink-owner-info.presenter';

@Controller('food-and-drinks')
export class FoodAndDrinkController {
    constructor(private readonly foodAndDrinkService: FoodAndDrinkService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(
        @Body() createFoodAndDrinkDto: CreateFoodAndDrinkDto,
        @Req() req: IUserRequest,
    ): Promise<FoodAndDrinkOwnerInfoPresenter> {
        const foodAndDrink = await this.foodAndDrinkService.create(
            createFoodAndDrinkDto,
            req.user.userId,
        );
        return plainToInstance(FoodAndDrinkOwnerInfoPresenter, foodAndDrink, {
            excludeExtraneousValues: true,
        });
    }

    @Get()
    async find(): Promise<FoodAndDrinkListPresenter[]> {
        const foodAndDrinks = await this.foodAndDrinkService.find();
        return plainToInstance(FoodAndDrinkListPresenter, foodAndDrinks, {
            excludeExtraneousValues: true,
        });
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

    @UseGuards(AuthGuard('jwt'))
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

    @UseGuards(AuthGuard('jwt'))
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
}
