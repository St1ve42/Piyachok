import { ApiProperty } from '@nestjs/swagger';

export class ResponseBadRequestErrorDto {
    @ApiProperty({ example: 400 })
    status: number;
    @ApiProperty({ example: 'BAD_REQUEST' })
    error: string;
    @ApiProperty({
        example: [
            {
                property: 'password',
                message:
                    'Пароль повинен містити принаймні 8 символів, 1 велику літеру, 1 маленьку літеру, 1 цифру, 1 символ та не перевищувати 16 символів',
            },
            {
                property: 'phone',
                message: "Телефон повинен бути вигляду '+380000000000'",
            },
        ],
    })
    messages: {
        property: string;
        message: string;
    }[];
}
