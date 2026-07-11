import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetNullableFieldsOfTables1776772788185 implements MigrationInterface {
    name = 'SetNullableFieldsOfTables1776772788185';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP COLUMN \`rating\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD \`rating\` float NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP COLUMN \`rating\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD \`rating\` int NULL`,
        );
    }
}
