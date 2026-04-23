import { IsOptional, IsString, Matches } from 'class-validator';

export class SocialNetworkDto {
    @IsOptional()
    @IsString()
    @Matches(/^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/, {
        message:
            'Посилання на соціальну мережу має бути вигляду https://www.instagram.com/...',
    })
    instagram?: string;

    @IsOptional()
    @IsString()
    @Matches(/^https:\/\/(www\.)?telegram\.org\/[a-zA-Z0-9_.]+\/?$/, {
        message:
            'Посилання на соціальну мережу має бути вигляду https://www.telegram.org/...',
    })
    telegram?: string;

    @IsOptional()
    @IsString()
    @Matches(/^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_.]+\/?$/, {
        message:
            'Посилання на соціальну мережу має бути вигляду https://www.facebook.com/...',
    })
    facebook?: string;

    @IsOptional()
    @IsString()
    @Matches(/^https:\/\/(www\.)?x\.com\/[a-zA-Z0-9_.]+\/?$/, {
        message:
            'Посилання на соціальну мережу має бути вигляду https://www.x.com/...',
    })
    X?: string;
}
