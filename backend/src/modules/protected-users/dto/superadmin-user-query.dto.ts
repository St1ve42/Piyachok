import { BaseQueryDto } from '../../../shared/dto/base-query.dto';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SortEnum } from '../../../shared/enums/sort.enum';
import { UserSortByEnum } from '../enums/UserSortByEnum';
import { GlobalUserRoleEnum } from '../../users/enums/global.user.role.enum';

export class SuperadminUserQueryDto extends BaseQueryDto {
    @ApiProperty({ example: 'Олександр' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ example: 'oleksandr.petrenko@example.com' })
    @IsOptional()
    email?: string;

    @ApiProperty({ example: 'Пастухов' })
    @IsOptional()
    @IsString()
    surname?: string;

    @ApiProperty({ example: 'user' })
    @IsOptional()
    @IsEnum(GlobalUserRoleEnum)
    role?: GlobalUserRoleEnum;

    @ApiPropertyOptional({
        description: 'Напрям сортування: за зростанням або спаданням',
        example: SortEnum.ASC,
        enum: SortEnum,
    })
    @IsOptional()
    @IsEnum(SortEnum)
    sort?: SortEnum;

    @ApiPropertyOptional({
        description: 'Сортування за ознакою',
        example: UserSortByEnum.NAME,
        enum: UserSortByEnum,
    })
    @IsOptional()
    @IsEnum(UserSortByEnum)
    sortBy?: UserSortByEnum;
}
