import { Module } from '@nestjs/common';
import { SuperadminCommentsController } from './superadmin-comments.controller';
import { CommentsModule } from '../comments/comments.module';

@Module({
    imports: [CommentsModule],
    controllers: [SuperadminCommentsController],
    providers: [],
})
export class SuperadminCommentsModule {}
