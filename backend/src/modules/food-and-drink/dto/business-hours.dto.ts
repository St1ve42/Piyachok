import { FoodAndDrinkDaysEnum } from '../enums/food-and-drink-days.enum';
import { IsEnum, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BusinessHoursDto {
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
    @IsEnum(FoodAndDrinkDaysEnum)
    day: FoodAndDrinkDaysEnum;

    @ApiProperty({
        example: '08:00',
        description: 'Час відкриття закладу (формат: HH:mm)',
    })
    @IsString()
    @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
        message: 'open має бути вигляду 00:00',
    })
    open: string;

    @ApiProperty({
        example: '22:00',
        description: 'Час закриття закладу (формат: HH:mm)',
    })
    @IsString()
    @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
        message: 'close має бути вигляду 00:00',
    })
    close: string;
}
