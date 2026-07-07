import { QueryBaseDto } from '../../../shared/dto/query-base.dto';
import { City } from '../../cities/entities/city.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseCityListDto extends QueryBaseDto {
    @ApiProperty({ type: () => [City] })
    data: City[];
    @ApiProperty({ example: 25 })
    total: number;
}
