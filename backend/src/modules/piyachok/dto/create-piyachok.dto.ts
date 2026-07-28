import {
    IsUUID,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
    MaxLength,
    IsEnum,
    IsInt,
    Min,
    IsNumber,
    IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentTypeEnum } from '../enums/payment-type.enum';
import { GenderEnum } from '../../users/enums/gender.enum';

export class CreatePiyachokDto {
    @ApiProperty({
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        description: 'ID закладу (UUID)',
    })
    @IsUUID()
    @IsNotEmpty()
    foodAndDrinkId: string;

    @ApiProperty({
        example: '2024-12-25',
        description: 'Дата зустрічі (YYYY-MM-DD)',
    })
    @IsDate()
    meetDate: Date;

    @ApiProperty({
        example: '18:30',
        description: 'Час зустрічі (HH:mm)',
    })
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    meetTime: string;

    @ApiProperty({
        example: 'Шукаю компанію для ввечері',
        description: 'Мета зустрічі (2-255 символів)',
    })
    @IsString()
    @MinLength(2)
    @MaxLength(255)
    purpose: string;

    @ApiProperty({
        example: 'male',
        enum: GenderEnum,
        description: 'Стать учасників',
    })
    @IsEnum(GenderEnum)
    targetGender: GenderEnum;

    @ApiProperty({
        example: 4,
        description: 'Кількість людей (мінімум 1)',
    })
    @IsInt()
    @Min(1)
    peopleCount: number;

    @ApiProperty({
        example: 'split',
        enum: PaymentTypeEnum,
        description: 'Тип оплати',
    })
    @IsEnum(PaymentTypeEnum)
    paymentType: PaymentTypeEnum;

    @ApiProperty({
        example: 500,
        description: 'Бюджет (позитивне число)',
    })
    @IsNumber()
    @Min(0)
    budget: number;
}
