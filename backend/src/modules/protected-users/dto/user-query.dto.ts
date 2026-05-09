import { BaseQueryDto } from '../../../shared/dto/base-query.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { UserSearchDto } from './user-search.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UserQueryDto extends BaseQueryDto {
    @ApiPropertyOptional({
        description: 'Параметри пошуку користувачів',
        type: () => UserSearchDto,
    })
    @IsOptional()
    @ValidateNested()
    @Type(() => UserSearchDto)
    search?: UserSearchDto;
}
