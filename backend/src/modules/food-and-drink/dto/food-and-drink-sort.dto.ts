import { IsIn, IsOptional } from 'class-validator';
import { FindOptionsOrder } from 'typeorm';
import { FoodAndDrink } from '../entities/food-and-drink.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

const allowedSortValues = ['asc', 'desc'];

export class FoodAndDrinkSortDto implements FindOptionsOrder<FoodAndDrink> {
    @ApiPropertyOptional({
        example: 'desc',
        enum: ['asc', 'desc'],
        description: 'Сортування за рейтингом закладу',
    })
    @IsOptional()
    @IsIn(allowedSortValues)
    rating?: 'asc' | 'desc';

    @ApiPropertyOptional({
        example: 'asc',
        enum: ['asc', 'desc'],
        description: 'Сортування за середньою вартістю меню',
    })
    @IsOptional()
    @IsIn(allowedSortValues)
    averageReceipt?: 'asc' | 'desc';

    @ApiPropertyOptional({
        example: 'desc',
        enum: ['asc', 'desc'],
        description: 'Сортування за датою створення',
    })
    @IsOptional()
    @IsIn(allowedSortValues)
    createdAt?: 'asc' | 'desc';

    @ApiPropertyOptional({
        example: 'asc',
        enum: ['asc', 'desc'],
        description: 'Сортування за назвою закладу',
    })
    @IsOptional()
    @IsIn(allowedSortValues)
    name?: 'asc' | 'desc';

    @ApiPropertyOptional({
        example: 'asc',
        enum: ['asc'],
        description:
            'Сортування за відстанню від користувача (тільки за зростанням)',
    })
    @IsOptional()
    @IsIn(['asc'])
    distance?: 'asc';
}
