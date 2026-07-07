import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryBaseDto {
    @ApiProperty({
        example: 10,
        description:
            'Кількість елементів на одній сторінці (за замовчуванням: 10)',
        required: false,
    })
    @IsInt()
    @Min(1)
    @IsOptional()
    limit: number = 10;

    @ApiProperty({
        example: 1,
        description:
            'Номер сторінки для пагінації (починається з 1, за замовчуванням: 1)',
        required: false,
    })
    @IsInt()
    @Min(1)
    @IsOptional()
    page: number = 1;

    @ApiProperty({
        example: 0,
        description:
            'Кількість елементів, яка пропускаються (за замовчуванням: 0)',
        required: false,
    })
    @IsInt()
    @Min(0)
    @IsOptional()
    skip: number = 0;
}

export class StringSearchQueryDto extends QueryBaseDto {
    @ApiProperty({
        example: 'Закарпатська',
        description: 'Текстовий запит для пошуку',
        required: false,
    })
    @IsString()
    @IsOptional()
    search?: string;
}
