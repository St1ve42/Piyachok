import { Controller, Get, Param, Query } from '@nestjs/common';
import { IRegion, RegionsService } from './regions.service';
import { BaseQueryDto } from '../../shared/dto/base-query.dto';
import { IdValidationPipe } from '../../shared/pipes/id-validation.pipe';
import { RegionValidationPipe } from '../../shared/pipes/body-validation.pipe';
import { CitiesService } from '../cities/cities.service';

@Controller('regions')
export class RegionsController {
  constructor(
    private readonly regionsService: RegionsService,
    private readonly citiesService: CitiesService,
  ) {}

  @Get()
  async find(
    @Query() query: BaseQueryDto,
  ): Promise<{ data: IRegion[]; total: number } & BaseQueryDto> {
    const [data, total] = await this.regionsService.find(query);
    return {
      data,
      total,
      ...query,
    };
  }

  @Get('/:id/cities')
  async findCitiesByRegionId(
    @Query() query: BaseQueryDto,
    @Param('id', IdValidationPipe, RegionValidationPipe) id: number,
  ): Promise<{ data: IRegion[]; total: number } & BaseQueryDto> {
    const [data, total] = await this.citiesService.findByRegionId(id, query);
    return {
      data,
      total,
      ...query,
    };
  }
}
