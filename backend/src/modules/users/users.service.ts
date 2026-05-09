import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeepPartial, FindOptionsWhere, Like, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProviderEnum } from '../../shared/enums/provider.enum';
import { ErrorResponse } from '../../shared/error/error-response';
import { CitiesService } from '../cities/cities.service';
import { RegionsService } from '../regions/regions.service';
import { Region } from '../regions/entities/region.entity';
import { City } from '../cities/entities/city.entity';
import { GlobalUserRoleEnum } from './enums/global.user.role.enum';
import { StorageService } from '../storage/storage.service';
import { itemNameEnum } from '../storage/enums/itemNameEnum';
import { UserQueryDto } from '../protected-users/dto/user-query.dto';
import { UserSearchDto } from '../protected-users/dto/user-search.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly cityService: CitiesService,
        private readonly regionService: RegionsService,
        private readonly storageService: StorageService,
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

    async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        await this.userRepository.update(id, updateUserDto);
        return (await this.findById(id)) as User;
    }

    async updateByEntity(
        user: User,
        updateUserDto: UpdateUserDto,
    ): Promise<User> {
        const entityLikes: DeepPartial<User> = { ...updateUserDto };
        await this.checkPhoneUniqueness(updateUserDto);
        const { region, city } =
            await this.validateAndFetchLocation(updateUserDto);
        entityLikes.region = region;
        entityLikes.city = city;
        const mergedUser = this.userRepository.merge(user, entityLikes);
        return await this.userRepository.save(mergedUser);
    }

    async softDeleteById(id: string, role: GlobalUserRoleEnum): Promise<void> {
        const isSuperAdmin = role === GlobalUserRoleEnum.SUPERADMIN;
        if (isSuperAdmin) {
            throw new ForbiddenException(
                'Ви не можете видалити свій акаунт, оскільки Ви є суперадміністратор.',
            );
        }
        const isAdmin = role === GlobalUserRoleEnum.ADMIN;
        if (isAdmin) {
            throw new ForbiddenException(
                'Ви не можете видалити свій акаунт, оскільки Ви є адміністратор.',
            );
        }
        await this.updateById(id, { isDeleted: true });
    }

    async find(query: UserQueryDto): Promise<[User[], number]> {
        const { page, limit, skip, search } = query;
        const filter: FindOptionsWhere<User> = {};
        if (search) {
            (
                Object.entries(search) as [
                    keyof UserSearchDto,
                    UserSearchDto[keyof UserSearchDto],
                ][]
            ).forEach(([key, value]) => {
                if (value) {
                    switch (typeof value) {
                        case 'string':
                            filter[key] = Like(`%${value}%`);
                            break;
                        default:
                            filter[key] = value;
                            break;
                    }
                }
            });
        }
        return await Promise.all([
            this.userRepository.find({
                take: limit,
                skip: (page - 1) * limit + skip,
                where: filter,
            }),
            this.userRepository.countBy(filter),
        ]);
    }

    async findById(id: string): Promise<User | null> {
        return await this.userRepository.findOneBy({ id });
    }

    async save(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async existsByParams(params: FindOptionsWhere<User>): Promise<boolean> {
        return await this.userRepository.existsBy(params);
    }

    async findOneByParams(
        params: FindOptionsWhere<User>,
    ): Promise<User | null> {
        return await this.userRepository.findOneBy(params);
    }

    async uploadPhoto(file: Express.Multer.File, user: User): Promise<User> {
        const { photo } = user;
        if (photo) {
            await this.storageService.deleteFile(photo);
        }
        user.photo = await this.storageService.uploadFile(
            file,
            itemNameEnum.USER,
            user.id,
        );
        return await this.userRepository.save(user);
    }

    async deletePhoto(user: User): Promise<User> {
        const { photo } = user;
        if (!photo) {
            throw new NotFoundException('У Вас немає фотографії.');
        }
        await this.storageService.deleteFile(photo);
        user.photo = null;
        return await this.userRepository.save(user);
    }

    private async checkPhoneUniqueness(userDto: UpdateUserDto): Promise<void> {
        const { phone } = userDto;
        if (phone) {
            const doesUserExists = await this.existsByParams({ phone });
            if (doesUserExists) {
                throw new ConflictException(
                    new ErrorResponse(
                        'AUTH_EXISTS',
                        'Користувач з таким телефоном вже існує або цей номер вже належить Вам. Спробуйте інакший варіант.',
                    ),
                );
            }
        }
    }

    private async validateAndFetchLocation(
        userDto: UpdateUserDto,
    ): Promise<{ region?: Region; city?: City }> {
        const { cityId, regionId } = userDto;
        if ((cityId && !regionId) || (regionId && !cityId)) {
            throw new BadRequestException(
                'Назви міста і регіону мають бути одночасно',
            );
        }
        if (regionId && cityId) {
            const region = await this.regionService.findById(regionId);
            if (!region) {
                throw new NotFoundException(
                    new ErrorResponse(
                        'AUTH_NOT_FOUND',
                        `Не існує регіону з id ${regionId}.`,
                    ),
                );
            }
            const city = await this.cityService.findById(cityId);
            if (!city) {
                throw new NotFoundException(
                    new ErrorResponse(
                        'AUTH_NOT_FOUND',
                        `Не існує міста з id ${cityId}.`,
                    ),
                );
            }
            const isSameRegion = city.regionId === regionId;
            if (!isSameRegion) {
                throw new NotFoundException(
                    new ErrorResponse(
                        'AUTH_NOT_FOUND',
                        `Місто з id ${cityId} не знаходиться в регіоні з id ${regionId}.`,
                    ),
                );
            }
            return { region, city };
        }
        return {};
    }
}
