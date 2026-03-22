import { Injectable } from '@nestjs/common';
import { BaseQueryDto } from '../../shared/dto/base-query.dto';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City) private cityRepository: Repository<City>,
  ) {}
  async findByRegionId(
    id: number,
    query: BaseQueryDto,
  ): Promise<[City[], number]> {
    const { limit, page, skip } = query;
    const filter: FindOptionsWhere<City> = { regionId: id };
    return await Promise.all([
      this.cityRepository.find({
        where: filter,
        take: limit,
        skip: limit * (page - 1) + skip,
        select: { id: true, name: true },
      }),
      this.cityRepository.count({ where: filter }),
    ]);
  }
}
