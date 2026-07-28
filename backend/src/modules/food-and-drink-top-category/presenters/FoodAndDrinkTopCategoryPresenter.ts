import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FoodAndDrinkTopCategoryPresenter {
    @ApiProperty({
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        description: 'ID топ-категорії',
    })
    @Expose()
    id: string;

    @ApiProperty({ example: 'Сніданки', description: 'Назва топ-категорії' })
    @Expose()
    name: string;
}
