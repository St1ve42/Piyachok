import { BaseQueryDto } from '../../../shared/dto/base-query.dto';
import { City } from '../../cities/entities/city.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseCityListDto extends BaseQueryDto {
    @ApiProperty({ type: () => [City] })
    data: City[];
    @ApiProperty({ example: 25 })
    total: number;
}
