import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
    create() {
        return 'This action adds a new comment';
    }

    findAll() {
        return `This action returns all comments`;
    }

    findOne(id: number) {
        return `This action returns a #${id} comment`;
    }

    update(id: number) {
        return `This action updates a #${id} comment`;
    }

    remove(id: number) {
        return `This action removes a #${id} comment`;
    }
}
