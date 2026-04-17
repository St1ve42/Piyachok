import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProviderEnum } from '../../shared/enums/provider.enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    async create(createUserDto: CreateUserDto): Promise<User> {
        const { cityId, regionId, provider, ...restUser } = createUserDto;
        const user = this.userRepository.create({
            ...restUser,
            regionId,
            cityId,
            roleId: 1,
            providers: provider ? [provider] : [ProviderEnum.LOCAL],
        });
        await this.userRepository.save(user);
        return (await this.userRepository.findOneBy({ id: user.id })) as User;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        await this.userRepository.update(id, updateUserDto);
        return (await this.findById(id)) as User;
    }

    async find(): Promise<User[]> {
        return await this.userRepository.find({});
    }

    async findById(id: string): Promise<User | null> {
        return await this.userRepository.findOneBy({ id });
    }

    async save(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async findOneByParams(
        params: FindOptionsWhere<User>,
    ): Promise<User | null> {
        return await this.userRepository.findOneBy(params);
    }
}
