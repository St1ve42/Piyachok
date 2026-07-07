import { QueryBaseDto } from '../../../shared/dto/query-base.dto';
import { Region } from '../entities/region.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseRegionListDto extends QueryBaseDto {
    @ApiProperty({ type: () => [Region] })
    data: Region[];
    @ApiProperty({ example: 25 })
    total: number;
}
