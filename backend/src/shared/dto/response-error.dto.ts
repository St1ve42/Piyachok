import { ApiProperty } from '@nestjs/swagger';

export class ResponseErrorDto {
    @ApiProperty({ example: 'ERROR_CODE' })
    error: string;
    @ApiProperty({
        example: 'Опис помилки',
    })
    message: string;
}
