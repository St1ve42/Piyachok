import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PiyachokRepliesService } from './piyachok-replies.service';
import { PiyachokRepliesController } from './piyachok-replies.controller';
import { PiyachokReply } from './entities/piyachok-reply.entity';
import { Piyachok } from '../piyachok/entities/piyachok.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PiyachokReply, Piyachok])],
    controllers: [PiyachokRepliesController],
    providers: [PiyachokRepliesService],
    exports: [PiyachokRepliesService],
})
export class PiyachokRepliesModule {}
