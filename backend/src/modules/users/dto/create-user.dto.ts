import { ProviderEnum } from '../../../shared/enums/provider.enum';
import { GenderEnum } from '../enums/gender.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsInt,
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Matches,
    MaxLength,
    Min,
    MinLength,
    ValidateIf,
} from 'class-validator';
import { GlobalUserRoleEnum } from '../enums/global.user.role.enum';
import { Role } from '../../roles/entities/role.entity';

export class CreateUserDto {
    @ApiProperty({
        example: 'Олександр',
        description: "Ім'я користувача (2-50 символів)",
    })
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name: string;

    @ApiProperty({
        example: 'Петренко',
        description: 'Прізвище користувача (2-50 символів)',
    })
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    surname: string;

    @ApiProperty({
        example: 30,
        description: 'Вік користувача (від 1 року)',
    })
    @IsNumber()
    @Min(1)
    @IsInt()
    age: number;

    @ApiProperty({
        example: 'oleksandr.petrenko@example.com',
        description: 'Email користувача',
    })
    @IsEmail(
        {},
        {
            message: 'Невалідний email. Формат має бути name@example.com',
        },
    )
    email?: string;

    @ApiProperty({
        example: 'StrongPassword123!',
        description:
            'Пароль (8-16 символів, 1 велика/мала літера, 1 цифра, 1 спеціальний символ)',
    })
    @IsString()
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
        {
            message:
                'Пароль повинен містити принаймні 8 символів, 1 велику літеру, 1 маленьку літеру, 1 цифру, 1 символ та не перевищувати 16 символів',
        },
    )
    password?: string;

    provider?: ProviderEnum;

    @ApiProperty({
        example: 1,
        description: 'ID міста проживання',
    })
    @IsNumber()
    @IsInt()
    @Min(1)
    cityId: number;

    @ApiProperty({
        example: 10,
        description: 'ID регіону проживання',
    })
    @IsNumber()
    @IsInt()
    @Min(1)
    regionId: number;

    @ApiProperty({
        example: 'male',
        description: 'Стать користувача (male/female)',
        required: false,
    })
    @IsOptional()
    @IsEnum(GenderEnum)
    @ValidateIf((_, value) => value !== null)
    gender?: GenderEnum;

    @ApiProperty({
        example: '+380501234567',
        description: "Телефон користувача (формат: '+380000000000')",
        required: false,
    })
    @IsOptional()
    @IsPhoneNumber(undefined, {
        message: "Телефон повинен бути вигляду '+380000000000'",
    })
    phone?: string;

    photo?: string;
    firebaseUid?: string;

    @ApiPropertyOptional({
        example: true,
        description: 'Чи активний акаунт користувача',
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiPropertyOptional({
        example: true,
        description: 'Чи верифіковано користувача через email',
    })
    @IsOptional()
    @IsBoolean()
    isVerified?: boolean;

    @ApiPropertyOptional({
        example: false,
        description: "Чи видалено акаунт користувача (м'яке видалення)",
    })
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @ApiPropertyOptional({
        example: false,
        description: 'Роль користувача',
    })
    @IsOptional()
    @IsEnum(GlobalUserRoleEnum)
    role?: Role;
}
