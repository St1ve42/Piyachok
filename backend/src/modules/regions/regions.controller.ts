import { Controller, Get, Param, Query } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { BaseQueryDto } from '../../shared/dto/base-query.dto';
import { IdValidationPipe } from '../../shared/pipes/id-validation.pipe';
import { RegionValidationPipe } from '../../shared/pipes/body-validation.pipe';
import { CitiesService } from '../cities/cities.service';
import { ResponseRegionListDto } from './dto/response-region-list.dto';
import { ResponseCityListDto } from './dto/response-city-list.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';

@Controller('regions')
export class RegionsController {
  constructor(
    private readonly regionsService: RegionsService,
    private readonly citiesService: CitiesService,
  ) {}

  @ApiOperation({ summary: 'Регіони України' })
  @ApiResponse({
    status: 200,
    type: ResponseRegionListDto,
  })
  @ApiResponse({
    status: 400,
    type: ResponseErrorDto,
  })
  @Get()
  async find(@Query() query: BaseQueryDto): Promise<ResponseRegionListDto> {
    const [data, total] = await this.regionsService.find(query);
    return {
      data,
      total,
      ...query,
    };
  }

  @ApiOperation({ summary: 'Міста певного регіону України' })
  @ApiResponse({
    status: 200,
    type: ResponseCityListDto,
  })
  @ApiResponse({
    status: 400,
    type: ResponseErrorDto,
  })
  @ApiResponse({
    status: 404,
    type: ResponseErrorDto,
  })
  @Get('/:id/cities')
  async findCitiesByRegionId(
    @Query() query: BaseQueryDto,
    @Param('id', IdValidationPipe, RegionValidationPipe) id: number,
  ): Promise<ResponseCityListDto> {
    const [data, total] = await this.citiesService.findByRegionId(id, query);
    return {
      data,
      total,
      ...query,
    };
  }
}
