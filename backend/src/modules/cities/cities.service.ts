import { Injectable } from '@nestjs/common';
import { StringSearchQueryDto } from '../../shared/dto/query-base.dto';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City) private cityRepository: Repository<City>,
    ) {}
    async findByRegionId(
        id: number,
        query: StringSearchQueryDto,
    ): Promise<[City[], number]> {
        const { limit, page, skip, search } = query;
        const filter: FindOptionsWhere<City> = { regionId: id };
        if (search) {
            filter.name = Like(`%${search}%`);
        }
        return await Promise.all([
            this.cityRepository.find({
                where: filter,
                take: limit,
                skip: limit * (page - 1) + skip,
                select: { id: true, name: true },
                relations: { region: true },
            }),
            this.cityRepository.count({ where: filter }),
        ]);
    }
    async findById(id: number): Promise<City | null> {
        return await this.cityRepository.findOneBy({ id });
    }
}
