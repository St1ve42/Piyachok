import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class ChangePasswordDto {
    @ApiProperty({ example: 'StrongPassword123!' })
    @IsString()
    oldPassword: string;

    @ApiProperty({ example: 'StrongPassword123!' })
    @IsString()
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,16}$/,
        {
            message:
                'Пароль повинен містити принаймні 8 символів, 1 велику літеру, 1 маленьку літеру, 1 цифру, 1 символ та не перевищувати 16 символів',
        },
    )
    newPassword: string;
}
