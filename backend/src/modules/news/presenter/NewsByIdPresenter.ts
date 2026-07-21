import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { GeneralNewsPresenter } from './GeneralNewsPresenter';

export class NewsByIdPresenter extends GeneralNewsPresenter {
    @ApiProperty({
        example: 'Короткий текст новини для попереднього перегляду',
        description: 'Короткий опис/текст новини',
    })
    @Expose()
    text: string;
}
