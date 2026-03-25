import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './entities/region.entity';
import { BaseQueryDto } from '../../shared/dto/base-query.dto';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region) private regionRepository: Repository<Region>,
  ) {}
  async find(query: BaseQueryDto): Promise<[Region[], number]> {
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

  async isExistsById(id: number): Promise<boolean> {
    return await this.regionRepository.existsBy({ id });
  }
}
