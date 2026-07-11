import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTextColumnTypeToTEXTInReviewEntity1782912387827 implements MigrationInterface {
    name = 'ChangeTextColumnTypeToTEXTInReviewEntity1782912387827';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`text\``);
        await queryRunner.query(
            `ALTER TABLE \`review\` ADD \`text\` text NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`text\``);
        await queryRunner.query(
            `ALTER TABLE \`review\` ADD \`text\` varchar(255) NOT NULL`,
        );
    }
}
