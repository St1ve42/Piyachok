import {
    IsNumber,
    IsObject,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength,
    ValidateNested,
} from 'class-validator';

export class CoordinatesDto {
    @IsNumber()
    @Min(-90)
    @Max(90)
    lat: number;

    @IsNumber()
    @Min(-180)
    @Max(180)
    lng: number;
}

export class LocationDto {
    @IsString()
    @MinLength(5)
    @MaxLength(100)
    street: string;

    @IsObject()
    @ValidateNested()
    coordinates?: CoordinatesDto;
}
