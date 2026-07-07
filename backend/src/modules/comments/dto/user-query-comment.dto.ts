import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { QueryCommentDto } from './query-comment.dto';

export class UserQueryCommentDto extends QueryCommentDto {
    @ApiPropertyOptional({
        example: 'Ресторан Україна',
        description: 'Фільтр за назвою закладу',
    })
    @IsOptional()
    @IsString()
    foodAndDrinkName?: string;
}
