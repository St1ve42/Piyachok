import { ApiProperty } from '@nestjs/swagger';

export class ResponseMessageDto {
    @ApiProperty({
        example: 'Опис повідомлення',
    })
    message: string;
}
