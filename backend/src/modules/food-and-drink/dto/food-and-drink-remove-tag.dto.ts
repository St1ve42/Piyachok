import {
    ArrayNotEmpty,
    IsArray,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class FoodAndDrinkRemoveTagDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsString({
        each: true,
    })
    @MinLength(3, {
        each: true,
    })
    @MaxLength(50, {
        each: true,
    })
    tags: string[];
}
