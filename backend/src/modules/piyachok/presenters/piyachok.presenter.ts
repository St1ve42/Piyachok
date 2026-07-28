import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PiyachokPresenter {
    @ApiProperty({ example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @Expose()
    id: string;

    @ApiProperty({ example: '2024-12-25' })
    @Expose()
    meetDate: Date;

    @ApiProperty({ example: '18:30' })
    @Expose()
    meetTime: string;

    @ApiProperty({ example: 'Шукаю компанію для ввечері' })
    @Expose()
    purpose: string;

    @ApiProperty({ example: 'active' })
    @Expose()
    status: string;

    @ApiProperty({ example: 'male' })
    @Expose()
    targetGender: string;

    @ApiProperty({ example: 4 })
    @Expose()
    peopleCount: number;

    @ApiProperty({ example: 'split' })
    @Expose()
    paymentType: string;

    @ApiProperty({ example: 500 })
    @Expose()
    budget: number;

    @ApiProperty({ example: '2024-12-20T10:00:00Z' })
    @Expose()
    createdAt: Date;

    @ApiProperty({ example: '2024-12-20T10:00:00Z' })
    @Expose()
    updatedAt: Date;
}
