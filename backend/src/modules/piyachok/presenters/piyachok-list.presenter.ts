import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ShortFoodAndDrinkInfoForPiyachokPresenter } from '../../food-and-drink/presenters/short-food-and-drink-info-for-piyachok.presenter';

export class PiyachokListPresenter {
    @ApiProperty({ example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @Expose()
    id: string;

    @ApiProperty({ example: '2024-12-25' })
    @Expose()
    meetDate: Date;

    @ApiProperty({ example: '18:30' })
    @Expose()
    meetTime: string;

    @ApiProperty({ example: 'Шукаю компанію для ввечері' })
    @Expose()
    purpose: string;

    @ApiProperty({ example: 'active' })
    @Expose()
    status: string;

    @ApiProperty({ type: () => ShortFoodAndDrinkInfoForPiyachokPresenter })
    @Expose()
    @Type(() => ShortFoodAndDrinkInfoForPiyachokPresenter)
    foodAndDrink: ShortFoodAndDrinkInfoForPiyachokPresenter;
}
