import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BaseQueryDto {
    @ApiProperty({ example: 11, required: false })
    @IsInt()
    @Min(1)
    @IsOptional()
    limit: number = 10;

    @ApiProperty({ example: 1, required: false })
    @IsInt()
    @Min(1)
    @IsOptional()
    page: number = 1;

    @ApiProperty({ example: 0, required: false })
    @IsInt()
    @Min(0)
    @IsOptional()
    skip: number = 0;

    @ApiProperty({ example: 'Закарпатська', required: false })
    @IsString()
    @IsOptional()
    search?: string;
}
