import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TagsPresenter {
    @ApiProperty({
        example: 'Українська кухня',
        description: 'Назва тегу для категоризації закладу',
    })
    @Expose()
    name: string;
}
