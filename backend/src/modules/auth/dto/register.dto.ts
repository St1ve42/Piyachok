import { GenderEnum } from '../../users/enums/gender.enum';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { GlobalUserRoleEnum } from '../../users/enums/global.user.role.enum';

export class RegisterDto {
  @IsString()
  @Min(3)
  @Max(50)
  name: string;
  @IsString()
  @Min(3)
  @Max(50)
  surname: string;
  @IsNumber()
  @Min(1)
  @IsInt()
  age: number;
  @IsEmail()
  email: string;
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
    {
      message:
        'Пароль повинен містити принаймні 8 символів, 1 велику літеру, 1 маленьку літеру, 1 цифру, 1 символ та не перевищувати 16 символів',
    },
  )
  password: string;
  @IsNumber()
  @IsInt()
  @Min(1)
  cityId: number;
  @IsNumber()
  @IsInt()
  @Min(1)
  regionId: number;
  @IsEnum(GlobalUserRoleEnum)
  gender?: GenderEnum;
  @IsPhoneNumber('UA')
  phone?: string;
}
