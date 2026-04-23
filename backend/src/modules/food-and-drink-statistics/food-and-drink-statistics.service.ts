import { Injectable } from '@nestjs/common';

@Injectable()
export class FoodAndDrinkStatisticsService {
    create() {
        return 'This action adds a new foodAndDrinkStatistic';
    }

    findAll() {
        return `This action returns all foodAndDrinkStatistics`;
    }

    findOne(id: number) {
        return `This action returns a #${id} foodAndDrinkStatistic`;
    }

    update(id: number) {
        return `This action updates a #${id} foodAndDrinkStatistic`;
    }

    remove(id: number) {
        return `This action removes a #${id} foodAndDrinkStatistic`;
    }
}
