import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
    @ApiProperty({
        example: 'Нова промо-акція',
        description: 'Заголовок новини (2-100 символів)',
    })
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    title: string;

    @ApiProperty({
        example: 'Текст новини з детальним описом події або акції',
        description: 'Текст новини (100-1000 символів)',
    })
    @IsString()
    @MinLength(100)
    @MaxLength(1000)
    text: string;
}
