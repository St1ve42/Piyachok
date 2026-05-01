import { FoodAndDrinkTypeEnum } from '../enums/food-and-drink-type.enum';
import {
    ArrayMinSize,
    ArrayNotEmpty,
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
import { BusinessHoursDto } from './businessHours.dto';
import { Type } from 'class-transformer';

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

    @IsObject()
    @ValidateNested()
    location: LocationDto;

    @IsNumber()
    @IsInt()
    @Min(1)
    cityId: number;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => BusinessHoursDto)
    businessHours: Array<BusinessHoursDto>;

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
    socialNetworks?: SocialNetworkDto;

    @IsOptional()
    @IsObject()
    @ValidateNested()
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
