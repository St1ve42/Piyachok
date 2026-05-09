import { forwardRef, Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { FoodAndDrinkModule } from '../food-and-drink/food-and-drink.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '../food-and-drink/entities/tag.entity';
import { SharedModule } from '../../shared/shared.module';

@Module({
    imports: [
        forwardRef(() => FoodAndDrinkModule),
        TypeOrmModule.forFeature([Tag]),
        SharedModule,
    ],
    controllers: [],
    providers: [TagsService],
    exports: [TagsService],
})
export class TagsModule {}
