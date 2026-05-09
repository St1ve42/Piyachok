import { FoodAndDrinkTypeEnum } from '../enums/food-and-drink-type.enum';
import {
    ArrayMinSize,
    ArrayNotEmpty,
    ArrayUnique,
    IsArray,
    IsEnum,
    IsInt,
    IsNumber,
    IsObject,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsUrl,
    MaxLength,
    Min,
    MinLength,
    ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SocialNetworkDto } from './social-network.dto';
import { FeaturesDto } from './features.dto';
import { LocationDto } from './location.dto';
import { BusinessHoursDto } from './business-hours.dto';
import { Type } from 'class-transformer';

export class CreateFoodAndDrinkDto {
    @ApiProperty({
        example: 'Ресторан Україна',
        description: 'Назва закладу (2-50 символів)',
    })
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name: string;

    @ApiProperty({
        example:
            "Традиційна українська кухня у серці міста з вишуканим інтер'єром та гарячою гостинністю.",
        description: 'Опис закладу (50-1000 символів)',
    })
    @IsString()
    @MinLength(50)
    @MaxLength(1000)
    description: string;

    @ApiProperty({
        enum: FoodAndDrinkTypeEnum,
        example: 'restaurant',
        description: 'Тип закладу (restaurant, cafe, bar, fast-food тощо)',
    })
    @IsEnum(FoodAndDrinkTypeEnum)
    type: FoodAndDrinkTypeEnum;

    @ApiProperty({
        description: 'Географічна локація закладу',
    })
    @IsObject()
    @ValidateNested()
    location: LocationDto;

    @ApiProperty({
        example: 42,
        description: 'ID міста',
    })
    @IsNumber()
    @IsInt()
    @Min(1)
    cityId: number;

    @ApiProperty({
        type: 'array',
        example: [
            { day: 'понеділок', start: '08:00', end: '22:00' },
            { day: 'вівторок', start: '08:00', end: '22:00' },
        ],
        description: 'Розклад роботи закладу по дням тижня',
    })
    @IsArray()
    @ArrayMinSize(1)
    @ArrayUnique<BusinessHoursDto>((o) => o.day)
    @ValidateNested({ each: true })
    @Type(() => BusinessHoursDto)
    businessHours: Array<BusinessHoursDto>;

    @ApiProperty({
        example: '+380501234567',
        description: "Телефон закладу (формат: '+380000000000')",
    })
    @IsPhoneNumber(undefined, {
        message: "Телефон повинен бути вигляду '+380000000000'",
    })
    phone: string;

    @ApiProperty({
        example: 250,
        description: 'Середня вартість однієї позиції меню в гривнях',
    })
    @IsNumber()
    averageReceipt: number;

    @ApiProperty({
        example: 'https://www.restaurant-ukraine.com.ua',
        description: 'Веб-сайт закладу (опціонально)',
    })
    @IsString()
    @IsOptional()
    @IsUrl(undefined, {
        message: 'Сайт повинен бути вигляду https://www.domain.com/...',
    })
    site?: string;

    @ApiProperty({
        example: {
            instagram: '@restaurant_ukraine',
            facebook: 'restaurant.ukraine.page',
        },
        description: 'Соціальні мережі закладу (опціонально)',
    })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    socialNetworks?: SocialNetworkDto;

    @ApiProperty({
        example: {
            isWifi: true,
            isParking: false,
            isLiveMusic: true,
            is24hrs: false,
        },
        description: 'Особливості закладу (опціонально)',
    })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    features?: FeaturesDto;

    @ApiProperty({
        type: 'array',
        example: ['Українська кухня', 'Вегетаріанське меню', 'Винна карта'],
        description:
            'Теги для категоризації закладу (опціонально, 1+ тегів, 3-50 символів кожен)',
        required: false,
    })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ArrayUnique()
    @IsString({
        each: true,
    })
    @MinLength(3, {
        each: true,
    })
    @MaxLength(50, {
        each: true,
    })
    tags?: string[];
}
