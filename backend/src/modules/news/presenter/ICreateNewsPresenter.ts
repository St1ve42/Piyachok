import { FoodAndDrinkNewsPresenter } from './FoodAndDrinkNewsPresenter';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ICreateNewsPresenter extends FoodAndDrinkNewsPresenter {
    @ApiProperty({
        example: 'Короткий текст новини для попереднього перегляду',
        description: 'Короткий опис/текст новини',
    })
    @Expose()
    text: string;
}
