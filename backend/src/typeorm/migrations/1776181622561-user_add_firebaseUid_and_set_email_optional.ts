import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddFirebaseUidAndSetEmailOptional1776181622561 implements MigrationInterface {
    name = 'UserAddFirebaseUidAndSetEmailOptional1776181622561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`providerId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`firebaseUid\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`providers\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`providers\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`providers\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`providers\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`firebaseUid\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`providerId\` varchar(255) NULL`);
    }

}
