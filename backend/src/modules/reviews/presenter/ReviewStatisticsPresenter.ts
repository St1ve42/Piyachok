import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewStatisticsPresenter {
    @ApiProperty({
        example: 5,
        description: 'Рейтинг (від 1 до 5)',
    })
    @Expose()
    rating: number;

    @ApiProperty({
        example: 42,
        description: 'Кількість відгуків з цим рейтингом',
    })
    @Expose()
    @Transform(({ value }: { value: number }) => Number(value))
    count: number;
}
