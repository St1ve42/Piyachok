import { FoodAndDrinkDaysEnum } from '../enums/food-and-drink-days.enum';
import { IsEnum, IsString, Matches } from 'class-validator';

export class BusinessHoursDto {
    @IsEnum(FoodAndDrinkDaysEnum)
    day: FoodAndDrinkDaysEnum;
    @IsString()
    @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
        message: 'open має бути вигляду 00:00',
    })
    open: string;
    @IsString()
    @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
        message: 'close має бути вигляду 00:00',
    })
    close: string;
}
