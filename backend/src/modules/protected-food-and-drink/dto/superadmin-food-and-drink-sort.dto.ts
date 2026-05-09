import { FoodAndDrinkSortDto } from '../../food-and-drink/dto/food-and-drink-sort.dto';
import { IsIn, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SuperadminFoodAndDrinkSortDto extends FoodAndDrinkSortDto {
    @ApiPropertyOptional({
        example: 'desc',
        enum: ['asc', 'desc'],
        description: 'Сортування за датою останнього оновлення закладу',
    })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    updatedAt?: 'asc' | 'desc';
}
