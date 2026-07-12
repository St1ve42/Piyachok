import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsEmailVerifiedColumnToFoodAndDrink1783762622696 implements MigrationInterface {
    name = 'AddIsEmailVerifiedColumnToFoodAndDrink1783762622696';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD \`isEmailVerified\` tinyint NOT NULL DEFAULT 0`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP COLUMN \`isEmailVerified\``,
        );
    }
}
