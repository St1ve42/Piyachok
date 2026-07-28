import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from './entities/news.entity';
import { FoodAndDrink } from '../food-and-drink/entities/food-and-drink.entity';
import { StorageModule } from '../storage/storage.module';

@Module({
    imports: [TypeOrmModule.forFeature([News, FoodAndDrink]), StorageModule],
    controllers: [NewsController],
    providers: [NewsService],
    exports: [NewsService],
})
export class NewsModule {}
