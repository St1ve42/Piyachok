import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewComplaintDto {
    @ApiProperty({
        example: 'Відгук містить образливі слова та спам',
        description: 'Причина скарги (2-500 символів)',
    })
    @IsString()
    @MinLength(2)
    @MaxLength(500)
    reason: 'text';
}
