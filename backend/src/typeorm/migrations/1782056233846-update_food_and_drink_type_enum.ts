import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateFoodAndDrinkTypeEnum1782056233846 implements MigrationInterface {
    name = 'UpdateFoodAndDrinkTypeEnum1782056233846';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` CHANGE \`type\` \`type\` enum ('restaurant', 'cafe', 'bar', 'pub', 'pizzeria', 'fast-food', 'bakery', 'coffee-shop', 'bistro', 'sushi-bar', 'canteen', 'hookah-bar') NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` CHANGE \`type\` \`type\` enum ('restaurant', 'cafe', 'bar', 'pub', 'pizzeria', 'fast-food', 'bakery', 'coffee-shop', 'bistro', 'sushi-bar', 'canteen', 'hookah-bar') NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` CHANGE \`type\` \`type\` enum ('ресторан', 'кафе', 'бар', 'паб', 'піцерія', 'фаст-фуд', 'пекарня', 'кав’ярня', 'бістро', 'суші-бар', 'їдальня', 'кальянна') NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` CHANGE \`type\` \`type\` enum ('ресторан', 'кафе', 'бар', 'паб', 'піцерія', 'фаст-фуд', 'пекарня', 'кав’ярня', 'бістро', 'суші-бар', 'їдальня', 'кальянна') NOT NULL`,
        );
    }
}
