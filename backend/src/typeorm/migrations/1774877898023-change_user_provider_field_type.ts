import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUserProviderFieldType1774877898023 implements MigrationInterface {
    name = 'ChangeUserProviderFieldType1774877898023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`providers\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`providers\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`providers\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`providers\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`providers\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`providers\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`providers\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`providers\` text NULL`);
    }

}
