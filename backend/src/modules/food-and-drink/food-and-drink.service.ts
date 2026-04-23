import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { CreateFoodAndDrinkDto } from './dto/create-food-and-drink.dto';
import { UpdateFoodAndDrinkDto } from './dto/update-food-and-drink.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodAndDrink } from './entities/food-and-drink.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class FoodAndDrinkService {
    constructor(
        @InjectRepository(FoodAndDrink)
        private readonly foodAndDrinkRepository: Repository<FoodAndDrink>,
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) {}

    async find(): Promise<FoodAndDrink[]> {
        return await this.foodAndDrinkRepository.find({});
    }

    async findById(id: string): Promise<FoodAndDrink | null> {
        return await this.foodAndDrinkRepository.findOneBy({ id });
    }

    async create(
        createFoodAndDrinkDto: CreateFoodAndDrinkDto,
        ownerId: string,
    ): Promise<FoodAndDrink> {
        const { tags } = createFoodAndDrinkDto;
        await this.checkExisting(createFoodAndDrinkDto, ownerId);
        const allTags = await this.getAllTags(tags);
        const foodAndDrink = this.foodAndDrinkRepository.create({
            ...createFoodAndDrinkDto,
            ownerId,
            tags: allTags,
        });
        await this.foodAndDrinkRepository.save(foodAndDrink);
        return (await this.findById(foodAndDrink.id)) as FoodAndDrink;
    }

    async update(
        id: string,
        updateFoodAndDrinkDto: UpdateFoodAndDrinkDto,
    ): Promise<FoodAndDrink> {
        if (Object.keys(updateFoodAndDrinkDto).length === 0) {
            throw new BadRequestException('Body не має бути порожнім');
        }
        const { tags } = updateFoodAndDrinkDto;
        await this.checkExisting(updateFoodAndDrinkDto);
        const entity = (await this.foodAndDrinkRepository.findOne({
            where: { id },
        })) as FoodAndDrink;

        const allTags = tags ? await this.getAllTags(tags) : undefined;

        const updatedEntity = this.foodAndDrinkRepository.merge(entity, {
            ...updateFoodAndDrinkDto,
            tags: allTags,
        });

        return await this.foodAndDrinkRepository.save(updatedEntity);
    }

    async delete(id: string): Promise<void> {
        await this.foodAndDrinkRepository.delete(id);
    }

    async save(foodAndDrink: FoodAndDrink): Promise<FoodAndDrink> {
        return await this.foodAndDrinkRepository.save(foodAndDrink);
    }

    async findOneByParams(
        params: FindOptionsWhere<FoodAndDrink>,
    ): Promise<FoodAndDrink | null> {
        return await this.foodAndDrinkRepository.findOneBy(params);
    }

    async existsByParams(
        params: FindOptionsWhere<FoodAndDrink>,
    ): Promise<boolean> {
        return await this.foodAndDrinkRepository.existsBy(params);
    }

    async isExistsById(id: string): Promise<boolean> {
        return await this.foodAndDrinkRepository.existsBy({ id });
    }

    private async checkExisting(
        foodAndDrink: CreateFoodAndDrinkDto | UpdateFoodAndDrinkDto,
        ownerId?: string,
    ): Promise<void> {
        const { phone, location } = foodAndDrink;
        let isExistsFoodAndDrink = phone
            ? await this.existsByParams({ phone })
            : false;
        if (isExistsFoodAndDrink) {
            throw new ConflictException(
                'Цей телефон вже прив`язаний до інакшого закладу. Виберіть інакший варіант.',
            );
        }
        isExistsFoodAndDrink = location
            ? await this.existsByParams({ location })
            : false;
        if (isExistsFoodAndDrink) {
            throw new ConflictException(
                'За цією адресою вже роозташований інакший заклад. Виберіть інакший варіант.',
            );
        }
        isExistsFoodAndDrink = ownerId
            ? await this.existsByParams({ ownerId })
            : false;
        if (isExistsFoodAndDrink) {
            throw new ConflictException(
                'Ви вже володієте закладом. Користувач не може мати більше, ніж один заклад.',
            );
        }
    }

    private async getAllTags(tags: string[]): Promise<Tag[]> {
        const existingTags = await this.tagRepository.findBy({
            name: In(tags),
        });
        let allTags = existingTags;
        const existingTagNames = existingTags.map(
            (existingTag) => existingTag.name,
        );
        const newTagNames = tags.filter(
            (tag) => !existingTagNames.includes(tag),
        );
        if (newTagNames.length > 0) {
            const newTagInstances = newTagNames.map((newTagName) =>
                this.tagRepository.create({
                    name: newTagName,
                }),
            );
            const savedNewTags = await this.tagRepository.save(newTagInstances);
            allTags = [...allTags, ...savedNewTags];
        }
        return allTags;
    }
}
