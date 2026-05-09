import { IsOptional, IsString, Matches } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SocialNetworkDto {
    @ApiPropertyOptional({
        example: 'https://www.instagram.com/restaurant_ukraine',
        description: 'Посилання на сторінку закладу в Instagram',
    })
    @IsOptional()
    @IsString()
    @Matches(/^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/, {
        message:
            'Посилання на соціальну мережу має бути вигляду https://www.instagram.com/...',
    })
    instagram?: string;

    @ApiPropertyOptional({
        example: 'https://t.me/restaurant_ukraine',
        description: 'Посилання на канал закладу в Telegram',
    })
    @IsOptional()
    @IsString()
    @Matches(
        /^(https?:\/\/)?(www\.)?(t\.me|telegram\.me)\/[a-zA-Z0-9_]{5,}\/?$/,
        {
            message:
                'Посилання на соціальну мережу має бути вигляду https://www.telegram.org/...',
        },
    )
    telegram?: string;

    @ApiPropertyOptional({
        example: 'https://www.facebook.com/restaurant.ukraine',
        description: 'Посилання на сторінку закладу в Facebook',
    })
    @IsOptional()
    @IsString()
    @Matches(/^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_.]+\/?$/, {
        message:
            'Посилання на соціальну мережу має бути вигляду https://www.facebook.com/...',
    })
    facebook?: string;

    @ApiPropertyOptional({
        example: 'https://www.x.com/restaurant_ukraine',
        description: 'Посилання на акаунт закладу в X (Twitter)',
    })
    @IsOptional()
    @IsString()
    @Matches(/^https:\/\/(www\.)?x\.com\/[a-zA-Z0-9_.]+\/?$/, {
        message:
            'Посилання на соціальну мережу має бути вигляду https://www.x.com/...',
    })
    X?: string;
}
