import { ApiProperty } from '@nestjs/swagger';

export class ResponseFindStatisticByFoodAndDrinkDto {
    @ApiProperty({ example: 1000 })
    totalViews: number;
    @ApiProperty({ example: 100 })
    totalFavourites: number;
}
