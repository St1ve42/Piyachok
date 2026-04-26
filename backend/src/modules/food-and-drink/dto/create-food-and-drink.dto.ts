import { FoodAndDrinkTypeEnum } from '../enums/food-and-drink-type.enum';
import {
    ArrayNotEmpty,
    IsArray,
    IsEnum,
    IsNumber,
    IsObject,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsUrl,
    MaxLength,
    MinLength,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SocialNetworkDto } from './social-network.dto';
import { FeaturesDto } from './features.dto';

export class CreateFoodAndDrinkDto {
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name: string;

    @IsString()
    @MinLength(50)
    @MaxLength(1000)
    description: string;

    @IsEnum(FoodAndDrinkTypeEnum)
    type: FoodAndDrinkTypeEnum;

    @IsString()
    @MinLength(10)
    @MaxLength(100)
    location: string;

    @IsString()
    @MinLength(10)
    @MaxLength(100)
    businessHours: string;

    @ApiProperty({ example: '+380501234567' })
    @IsPhoneNumber(undefined, {
        message: "Телефон повинен бути вигляду '+380000000000'",
    })
    phone: string;

    @IsNumber()
    averageReceipt: number;

    @IsString()
    @IsOptional()
    @IsUrl(undefined, {
        message: 'Сайт повинен бути вигляду https://www.domain.com/...',
    })
    site?: string;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => SocialNetworkDto)
    socialNetworks?: SocialNetworkDto;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => FeaturesDto)
    features?: FeaturesDto;

    @IsArray()
    @ArrayNotEmpty()
    @IsOptional()
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
