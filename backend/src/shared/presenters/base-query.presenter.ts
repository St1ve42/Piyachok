import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BaseQueryPresenter {
    @ApiProperty({
        example: 1,
        description: 'Поточна сторінка результатів (починається з 1)',
    })
    @Expose()
    page: number;

    @ApiProperty({
        example: 10,
        description: 'Кількість елементів на одній сторінці',
    })
    @Expose()
    limit: number;

    @ApiProperty({
        example: 0,
        description: 'Кількість елементів, яка пропускаються',
    })
    @Expose()
    skip: number;
}
