import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import { FoodAndDrinkTopCategory } from './entities/food-and-drink-top-category.entity';
import { CreateFoodAndDrinkTopCategoryDto } from './dto/create-food-and-drink-top-category.dto';
import { QueryFoodAndDrinkTopCategoryDto } from './dto/query-food-and-drink-top-category.dto';
import { UtilsService } from '../utils/utils.service';
import { UpdateFoodAndDrinkTopCategoryDto } from './dto/update-food-and-drink-top-category.dto';
import { AddFoodAndDrinkDto } from './dto/add-food-and-drink.dto';
import { FoodAndDrink } from '../food-and-drink/entities/food-and-drink.entity';
import { RemoveFoodAndDrinkDto } from './dto/remove-food-and-drink.dto';

@Injectable()
export class FoodAndDrinkCategoryService {
    constructor(
        @InjectRepository(FoodAndDrinkTopCategory)
        private readonly foodAndDrinkTopCategoryRepository: Repository<FoodAndDrinkTopCategory>,
        @InjectRepository(FoodAndDrink)
        private readonly foodAndDrinkRepository: Repository<FoodAndDrink>,
    ) {}

    async create(
        createDto: CreateFoodAndDrinkTopCategoryDto,
    ): Promise<Partial<FoodAndDrinkTopCategory>> {
        const { name } = createDto;
        await this.checkIfExistsName(name);
        const entity = this.foodAndDrinkTopCategoryRepository.create(createDto);
        await this.foodAndDrinkTopCategoryRepository.insert(entity);
        return entity;
    }

    async find(query: QueryFoodAndDrinkTopCategoryDto): Promise<{
        data: FoodAndDrinkTopCategory[];
        total: number;
        totalPages: number;
    }> {
        const { page, skip, limit, name } = query;
        const select: FindOptionsSelect<FoodAndDrinkTopCategory> = {
            id: true,
            name: true,
        };
        const filter: FindOptionsWhere<FoodAndDrinkTopCategory> = {};
        if (name) {
            filter.name = query.name;
        }
        const [data, total] =
            await this.foodAndDrinkTopCategoryRepository.findAndCount({
                where: filter,
                select,
                order: { name: 'ASC' },
                take: limit,
                skip: UtilsService.calculateSkipRecords(page, limit, skip),
            });
        const totalPages = UtilsService.calculateTotalPages(total, skip, limit);
        return { data, total, totalPages, ...query };
    }

    async findById(id: string): Promise<FoodAndDrinkTopCategory | null> {
        const select: FindOptionsSelect<FoodAndDrinkTopCategory> = {
            id: true,
            name: true,
        };
        return await this.foodAndDrinkTopCategoryRepository.findOne({
            where: { id },
            select,
        });
    }

    async update(
        id: string,
        updateDto: UpdateFoodAndDrinkTopCategoryDto,
    ): Promise<void> {
        const { name } = updateDto;
        if (name) {
            await this.checkIfExistsName(name);
        }
        await this.foodAndDrinkTopCategoryRepository.update(id, updateDto);
    }

    async delete(id: string): Promise<void> {
        const foodAndDrinkCategory =
            (await this.foodAndDrinkTopCategoryRepository.findOneBy({
                id,
            })) as FoodAndDrinkTopCategory;
        const targetItems: FoodAndDrink[] = await this.foodAndDrinkRepository
            .createQueryBuilder('foodAndDrink')
            .select('foodAndDrink.id', 'id')
            .innerJoin('foodAndDrink.topCategories', 'ftc')
            .groupBy('foodAndDrink.id')
            .having('COUNT(*) = 1')
            .andHaving('MAX(ftc.id) = :id', { id })
            .getRawMany();

        const ids = targetItems.map((item) => item.id);

        if (ids.length > 0) {
            await this.foodAndDrinkRepository
                .createQueryBuilder()
                .update()
                .set({ isTop: false })
                .whereInIds(ids)
                .execute();
        }
        await this.foodAndDrinkTopCategoryRepository.remove(
            foodAndDrinkCategory,
        );
    }

    async addFoodAndDrink(
        categoryId: string,
        addFoodAndDrinkDto: AddFoodAndDrinkDto,
    ): Promise<void> {
        const { foodAndDrinkId } = addFoodAndDrinkDto;
        const foodAndDrink = await this.foodAndDrinkRepository.findOneBy({
            id: foodAndDrinkId,
        });
        if (!foodAndDrink) {
            throw new NotFoundException(
                `Закладу з id ${foodAndDrinkId} не існує.`,
            );
        }

        const existsFoodAndDrink =
            await this.foodAndDrinkTopCategoryRepository.exists({
                where: {
                    id: categoryId,
                    foodAndDrinks: { id: foodAndDrinkId },
                },
            });
        if (existsFoodAndDrink) {
            throw new ConflictException(
                `Заклад з id ${foodAndDrinkId} вже є в категорії з id ${categoryId}`,
            );
        }
        const category = (await this.foodAndDrinkTopCategoryRepository.findOne({
            where: {
                id: categoryId,
            },
            relations: { foodAndDrinks: true },
        })) as FoodAndDrinkTopCategory;
        if (category.foodAndDrinks) {
            category.foodAndDrinks.push(foodAndDrink);
            await this.foodAndDrinkTopCategoryRepository.save(category);
            if (!foodAndDrink.isTop) {
                await this.foodAndDrinkRepository.update(foodAndDrink.id, {
                    isTop: true,
                });
            }
        }
    }

    async removeFoodAndDrink(
        categoryId: string,
        removeFoodAndDrinkDto: RemoveFoodAndDrinkDto,
    ): Promise<void> {
        const { foodAndDrinkId } = removeFoodAndDrinkDto;
        const foodAndDrink = await this.foodAndDrinkRepository.findOne({
            where: { id: foodAndDrinkId },
            relations: { topCategories: true },
        });
        if (!foodAndDrink) {
            throw new NotFoundException(
                `Закладу з id ${foodAndDrinkId} не існує.`,
            );
        }
        const { topCategories, name } = foodAndDrink;
        if (!topCategories || topCategories.length === 0) {
            throw new ConflictException(
                `Заклад "${name}" не є в категорії з id ${categoryId}`,
            );
        }
        const filteredTopCategories = topCategories.filter(
            (topCategory) => topCategory.id !== categoryId,
        );
        if (topCategories.length === filteredTopCategories.length) {
            throw new ConflictException(
                `Заклад з id ${foodAndDrinkId} не є в категорії з id ${categoryId}`,
            );
        }
        foodAndDrink.topCategories = filteredTopCategories;
        if (filteredTopCategories.length === 0) {
            foodAndDrink.isTop = false;
        }
        await this.foodAndDrinkRepository.save(foodAndDrink);
    }

    async isExistsById(id: string): Promise<boolean> {
        return await this.foodAndDrinkTopCategoryRepository.existsBy({ id });
    }

    private async checkIfExistsName(name: string): Promise<void> {
        const existsCategory =
            await this.foodAndDrinkTopCategoryRepository.existsBy({ name });
        if (existsCategory) {
            throw new ConflictException(
                'Така категорія вже існує. Виберіть інакшу назву',
            );
        }
    }
}
