import {
    IsNotEmpty,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePiyachokReplyDto {
    @ApiProperty({
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        description: 'ID пиячка (UUID)',
    })
    @IsUUID()
    @IsNotEmpty()
    piyachokId: string;

    @ApiProperty({
        example: 'Я готовий приєднатись',
        description: 'Текст відповіді (1-250 символів)',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(250)
    text: string;
}
