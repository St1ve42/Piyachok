import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entity/tag.entity';
import { In, Repository } from 'typeorm';
import { FoodAndDrinkService } from '../food-and-drink/food-and-drink.service';

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
}
