import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './entities/region.entity';
import { BaseQueryDto } from '../../shared/dto/base-query.dto';

export interface IRegion {
  id: number;
  name: string;
}

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region) private regionRepository: Repository<Region>,
  ) {}
  async find(query: BaseQueryDto): Promise<[IRegion[], number]> {
    const { limit, page, skip } = query;
    return await Promise.all([
      this.regionRepository.find({
        take: limit,
        skip: limit * (page - 1) + skip,
      }),
      this.regionRepository.count(),
    ]);
  }

  async findById(id: number): Promise<Region | null> {
    return await this.regionRepository.findOneBy({ id });
  }

  // async findCitiesById(id: number): Promise<Region | null> {
  //   return await this.regionRepository.findOne({
  //     where: { id },
  //     relations: { cities: true },
  //   });
  // }
}
