import { ApiProperty } from '@nestjs/swagger';

export class ResponseFoodAndDrinkFindViewsDto {
    @ApiProperty({ example: [5, 7, 3] })
    views: number[];

    @ApiProperty({
        example: [
            '2026-06-16T00:00:00.000Z',
            '2026-06-17T00:00:00.000Z',
            '2026-06-18T00:00:00.000Z',
        ],
    })
    dates: string[];
}
