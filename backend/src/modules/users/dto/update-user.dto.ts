import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Role } from '../../roles/entities/role.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiPropertyOptional({
        example: true,
        description: 'Чи активний акаунт користувача',
    })
    isActive?: boolean;

    @ApiPropertyOptional({
        example: true,
        description: 'Чи верифіковано користувача через email',
    })
    isVerified?: boolean;

    @ApiPropertyOptional({
        example: false,
        description: "Чи видалено акаунт користувача (м'яке видалення)",
    })
    isDeleted?: boolean;

    role?: Role;
}
