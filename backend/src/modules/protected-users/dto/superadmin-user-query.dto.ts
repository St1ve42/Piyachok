import { BaseQueryDto } from '../../../shared/dto/base-query.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SuperadminUserQueryDto extends BaseQueryDto {
    @ApiProperty({ example: 'Олександр' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ example: 'oleksandr.petrenko@example.com' })
    @IsOptional()
    @IsEmail(
        {},
        {
            message: 'Невалідний email. Формат має бути name@example.com',
        },
    )
    email?: string;

    @ApiProperty({ example: 'Пастухов' })
    @IsOptional()
    @IsString()
    surname?: string;
}
