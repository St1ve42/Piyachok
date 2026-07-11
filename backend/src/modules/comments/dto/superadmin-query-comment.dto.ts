import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { QueryCommentDto } from './query-comment.dto';

export class SuperadminQueryCommentDto extends QueryCommentDto {
    @ApiPropertyOptional({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        description: 'Фільтр за текстом коментарю',
    })
    @IsOptional()
    @IsString()
    text?: string;

    @ApiPropertyOptional({
        example: 'Олександр Петренко',
        description: 'Фільтр за ім`ям користувача',
    })
    @IsOptional()
    @IsString()
    userName?: string;

    @ApiPropertyOptional({
        example: 'Ресторан Україна',
        description: 'Фільтр за назвою закладу',
    })
    @IsOptional()
    @IsString()
    foodAndDrinkName?: string;
}
