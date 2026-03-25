import { GenderEnum } from '../../users/enums/gender.enum';
import {
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
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  //TODO Error about empty value
  @ApiProperty({ example: 'Олександр' })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;
  @ApiProperty({ example: 'Петренко' })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  surname: string;
  @ApiProperty({ example: 30 })
  @IsNumber()
  @Min(1)
  @IsInt()
  age: number;
  @ApiProperty({ example: 'oleksandr.petrenko@example.com' })
  @IsEmail(
    {},
    {
      message: 'Невалідний email. Формат має бути name@example.com',
    },
  )
  email: string;
  @ApiProperty({ example: 'StrongPassword123!' })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
    {
      message:
        'Пароль повинен містити принаймні 8 символів, 1 велику літеру, 1 маленьку літеру, 1 цифру, 1 символ та не перевищувати 16 символів',
    },
  )
  password: string;
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsInt()
  @Min(1)
  cityId: number;
  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsInt()
  @Min(1)
  regionId: number;
  @ApiProperty({ example: 'male' })
  @IsEnum(GenderEnum)
  @IsOptional()
  gender?: GenderEnum;
  @ApiProperty({ example: '+380501234567' })
  @IsPhoneNumber(undefined, {
    message: "Телефон повинен бути вигляду '+380000000000'",
  })
  @IsOptional()
  phone?: string;
}
