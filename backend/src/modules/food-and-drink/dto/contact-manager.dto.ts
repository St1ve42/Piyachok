import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContactManagerDto {
    @ApiProperty({
        example:
            "Добрий день! Я був би зацікавлений обговорити можливість організації приватного заходу у вашому закладі. Будь ласка, зв'яжіться зі мною з деталями.",
        description: 'Повідомлення до менеджера закладу (50-800 символів)',
    })
    @IsString()
    @MinLength(50)
    @MaxLength(800)
    message: string;
}
