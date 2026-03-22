import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { cityId, regionId, ...restUser } = createUserDto;
    const user = this.userRepository.create({
      ...restUser,
      region: { id: regionId },
      city: { id: cityId },
    });
    return this.userRepository.save(user);
  }

  async findById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }
}
