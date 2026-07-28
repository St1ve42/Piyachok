import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PiyachokService } from './piyachok.service';
import { PiyachokController } from './piyachok.controller';
import { Piyachok } from './entities/piyachok.entity';
import { PiyachokReply } from '../piyachok-replies/entities/piyachok-reply.entity';
import { FoodAndDrink } from '../food-and-drink/entities/food-and-drink.entity';
import { PiyachokRepliesModule } from '../piyachok-replies/piyachok-replies.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Piyachok, PiyachokReply, FoodAndDrink]),
        PiyachokRepliesModule,
    ],
    controllers: [PiyachokController],
    providers: [PiyachokService],
})
export class PiyachokModule {}
