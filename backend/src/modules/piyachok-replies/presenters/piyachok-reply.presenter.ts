import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PiyachokReplyPresenter {
    @ApiProperty({ example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @Expose()
    id: string;

    @ApiProperty({ example: 'Я готовий приєднатись' })
    @Expose()
    text: string;

    @ApiProperty({ example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @Expose()
    createdAt: Date;

    @ApiProperty({ example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @Expose()
    updatedAt: Date;
}
