import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { FoodAndDrink } from '../food-and-drink/entities/food-and-drink.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Comment, FoodAndDrink])],
    controllers: [CommentsController],
    providers: [CommentsService],
    exports: [CommentsService],
})
export class CommentsModule {}
