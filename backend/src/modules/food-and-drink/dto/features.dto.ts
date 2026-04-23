import { IsBoolean, IsOptional } from 'class-validator';

export class FeaturesDto {
    @IsBoolean()
    @IsOptional()
    isWifi?: boolean;
    @IsBoolean()
    @IsOptional()
    isParking?: boolean;
    @IsBoolean()
    @IsOptional()
    isLiveMusic?: boolean;
    @IsBoolean()
    @IsOptional()
    is24hrs?: boolean;
}
