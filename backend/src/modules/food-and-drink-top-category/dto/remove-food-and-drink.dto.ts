import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveFoodAndDrinkDto {
    @ApiProperty({
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        description: 'ID закладу харчування (uuid)',
    })
    @IsString()
    @IsUUID()
    foodAndDrinkId: string;
}
