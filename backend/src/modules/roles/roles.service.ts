import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
    ) {}
    async find(): Promise<Role[]> {
        return await this.roleRepository.find();
    }
    async findBy(where: FindOptionsWhere<Role>): Promise<Role | null> {
        return await this.roleRepository.findOneBy(where);
    }
}
