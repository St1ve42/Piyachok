import { MigrationInterface, QueryRunner } from "typeorm";

export class SetVarchar300AccessRefreshTokens1774632307366 implements MigrationInterface {
    name = 'SetVarchar300AccessRefreshTokens1774632307366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token\` DROP COLUMN \`accessToken\``);
        await queryRunner.query(`ALTER TABLE \`token\` ADD \`accessToken\` varchar(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`token\` DROP COLUMN \`refreshToken\``);
        await queryRunner.query(`ALTER TABLE \`token\` ADD \`refreshToken\` varchar(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_beb5846554bec348f6baf449e83\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_f1a2565b8f2580a146871cf1142\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`roleId\` \`roleId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`cityId\` \`cityId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`regionId\` \`regionId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`roleId\` \`roleId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`cityId\` \`cityId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`regionId\` \`regionId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_beb5846554bec348f6baf449e83\` FOREIGN KEY (\`cityId\`) REFERENCES \`city\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_f1a2565b8f2580a146871cf1142\` FOREIGN KEY (\`regionId\`) REFERENCES \`region\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_f1a2565b8f2580a146871cf1142\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_beb5846554bec348f6baf449e83\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`regionId\` \`regionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`cityId\` \`cityId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`roleId\` \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`regionId\` \`regionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`cityId\` \`cityId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`roleId\` \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_f1a2565b8f2580a146871cf1142\` FOREIGN KEY (\`regionId\`) REFERENCES \`region\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_beb5846554bec348f6baf449e83\` FOREIGN KEY (\`cityId\`) REFERENCES \`city\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`token\` DROP COLUMN \`refreshToken\``);
        await queryRunner.query(`ALTER TABLE \`token\` ADD \`refreshToken\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`token\` DROP COLUMN \`accessToken\``);
        await queryRunner.query(`ALTER TABLE \`token\` ADD \`accessToken\` varchar(255) NOT NULL`);
    }

}
