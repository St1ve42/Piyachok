import { IsEmail, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContactManagerDto {
    @ApiProperty({
        example: 'alex.kovalenko.dev@gmail.com',
        description: 'Email адреса користувача',
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Організація приватного заходу',
        description: 'Тема email',
    })
    @IsString()
    @MaxLength(100)
    subject: string;

    @ApiProperty({
        example:
            "Добрий день! Я був би зацікавлений обговорити можливість організації приватного заходу у вашому закладі. Будь ласка, зв'яжіться зі мною з деталями.",
        description: 'Повідомлення до менеджера закладу (50-800 символів)',
    })
    @IsString()
    @MaxLength(800)
    message: string;
}
