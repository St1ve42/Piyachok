import { PickType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { UpdateFoodAndDrinkDto } from './update-food-and-drink.dto';

export class FoodAndDrinkSearchDto extends PickType(UpdateFoodAndDrinkDto, [
    'name',
    'type',
]) {
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(10)
    rating?: number;

    @IsOptional()
    @IsBoolean()
    isWifi?: boolean;

    @IsOptional()
    @IsBoolean()
    isParking?: boolean;

    @IsOptional()
    @IsBoolean()
    isLiveMusic?: boolean;

    @IsOptional()
    @IsBoolean()
    is24hrs?: boolean;
}
