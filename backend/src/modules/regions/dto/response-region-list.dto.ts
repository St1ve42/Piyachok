import { BaseQueryDto } from '../../../shared/dto/base-query.dto';
import { Region } from '../entities/region.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseRegionListDto extends BaseQueryDto {
  @ApiProperty({ type: () => [Region] })
  data: Region[];
  @ApiProperty({ example: 25 })
  total: number;
}
