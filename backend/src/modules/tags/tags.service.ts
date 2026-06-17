import {
    ConflictException,
    forwardRef,
    Inject,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entity/tag.entity';
import { In, Repository } from 'typeorm';
import { FoodAndDrinkService } from '../food-and-drink/food-and-drink.service';
import { FoodAndDrink } from '../food-and-drink/entities/food-and-drink.entity';
import { FoodAndDrinkRemoveTagDto } from '../food-and-drink/dto/food-and-drink-remove-tag.dto';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
        @Inject(forwardRef(() => FoodAndDrinkService))
        private readonly foodAndDrinkService: FoodAndDrinkService,
    ) {}

    async createAndGetTags(tagNames: string[]): Promise<Tag[]> {
        //Find tags whose names are included in tag names' array
        const existingTags = await this.tagRepository.findBy({
            name: In(tagNames),
        });
        let allTags = existingTags;
        //New array of existing tag names
        const existingTagNames = existingTags.map(
            (existingTag) => existingTag.name,
        );
        //Find new tag names
        const newTagNames = tagNames.filter(
            (tag) => !existingTagNames.includes(tag),
        );
        //If there are new tag names it creates them
        //Otherwise just returns existing tag names
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

    async remove(
        foodAndDrinkId: string,
        removeTagsDto: FoodAndDrinkRemoveTagDto,
    ): Promise<FoodAndDrink> {
        const { tags: tagNames } = removeTagsDto;
        //Find all tags
        const foodAndDrink = (await this.foodAndDrinkService.findById(
            foodAndDrinkId,
            { tags: true },
        )) as FoodAndDrink;
        //If there are no tags it throws error
        if (!foodAndDrink.tags || foodAndDrink.tags.length === 0) {
            throw new ConflictException(
                'Цю дію неможливо зробити, оскільки у Вашого заклада немає тегів.',
            );
        }
        const foodAndDrinkTagNames = foodAndDrink.tags.map(
            (foodAndDrinkTagName) => foodAndDrinkTagName.name,
        );
        const notExistingTagNames = tagNames.filter(
            (tagName) => !foodAndDrinkTagNames.includes(tagName),
        );
        //If there are no existing tag names it throws error
        if (notExistingTagNames.length !== 0) {
            throw new ConflictException(
                `Цю дію неможливо зробити, оскільки у заклада немає таких тегів: ${UtilsService.outputArray(notExistingTagNames)}`,
            );
        }
        //Exclude tags that are in tags array and update entity
        foodAndDrink.tags = foodAndDrink.tags.filter(
            (tag) => !tagNames.includes(tag.name),
        );
        return await this.foodAndDrinkService.save(foodAndDrink);
    }
}
