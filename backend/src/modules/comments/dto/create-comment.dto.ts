import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiProperty({
        example:
            'Це чудовий заклад, але трохи дорого. Рекомендую спробувати їх фірмові страви.',
        description: 'Текст коментарю (50-500 символів)',
    })
    @IsString()
    @MinLength(1)
    @MaxLength(250)
    text: string;

    @ApiProperty({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        description: 'UUID ідентифікатор закладу',
    })
    @IsString()
    @IsUUID()
    foodAndDrinkId: string;
}
