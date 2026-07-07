import {
    IsInt,
    IsNumber,
    IsString,
    IsUUID,
    Max,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
    @ApiProperty({
        example: 5,
        description: 'Рейтинг закладу (від 1 до 5)',
    })
    @IsNumber()
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiProperty({
        example:
            "Чудовий заклад з вишуканим інтер'єром та гарячою гостинністю. Їжа була смачна і свіжа.",
        description: 'Текст відгуку (50-500 символів)',
    })
    @IsString()
    @MaxLength(500)
    @MinLength(50)
    text: string;

    @ApiProperty({
        example: 250,
        description: 'Середня вартість однієї позиції меню в гривнях',
    })
    @IsNumber()
    @Min(1)
    averageReceipt: number;

    @ApiProperty({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        description: 'UUID ідентифікатор закладу',
    })
    @IsString()
    @IsUUID()
    foodAndDrinkId: string;
}
