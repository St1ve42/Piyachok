import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeFeatures_еÐtypeFromRelationToArrayInFoodAndDrinkEntity1778516917466 implements MigrationInterface {
    name =
        'ChangeFeatures_еÐtypeFromRelationToArrayInFoodAndDrinkEntity1778516917466';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD \`features\` json NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP COLUMN \`features\``,
        );
    }
}
