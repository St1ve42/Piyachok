import { FoodAndDrinkDaysEnum } from '../enums/food-and-drink-days.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BusinessHoursPresenter {
    @ApiProperty({
        example: 'monday',
        enum: [
            'понеділок',
            'вівторок',
            'середа',
            'четвер',
            'пятниця',
            'субота',
            'неділя',
        ],
        description: 'День тижня',
    })
    @Expose()
    day: FoodAndDrinkDaysEnum;

    @ApiProperty({
        example: '08:00',
        description: 'Час відкриття закладу (формат: HH:mm)',
    })
    @Expose()
    open: string;

    @ApiProperty({
        example: '22:00',
        description: 'Час закриття закладу (формат: HH:mm)',
    })
    @Expose()
    close: string;
}
