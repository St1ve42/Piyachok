import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserAndCreateToken1774203512276 implements MigrationInterface {
    name = 'UpdateUserAndCreateToken1774203512276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`token\` (\`id\` varchar(36) NOT NULL, \`accessToken\` varchar(255) NOT NULL, \`refreshToken\` varchar(255) NOT NULL, \`accessTokenExpiresAt\` datetime NOT NULL, \`refreshTokenExpiresAt\` datetime NOT NULL, \`isBlocked\` tinyint NOT NULL DEFAULT 0, \`jti\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`city\` DROP FOREIGN KEY \`FK_a702dde63cef536819298d776b5\``);
        await queryRunner.query(`ALTER TABLE \`city\` CHANGE \`regionId\` \`regionId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`city\` CHANGE \`regionId\` \`regionId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`city\` ADD CONSTRAINT \`FK_a702dde63cef536819298d776b5\` FOREIGN KEY (\`regionId\`) REFERENCES \`region\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`token\` ADD CONSTRAINT \`FK_94f168faad896c0786646fa3d4a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token\` DROP FOREIGN KEY \`FK_94f168faad896c0786646fa3d4a\``);
        await queryRunner.query(`ALTER TABLE \`city\` DROP FOREIGN KEY \`FK_a702dde63cef536819298d776b5\``);
        await queryRunner.query(`ALTER TABLE \`city\` CHANGE \`regionId\` \`regionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`city\` CHANGE \`regionId\` \`regionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`city\` ADD CONSTRAINT \`FK_a702dde63cef536819298d776b5\` FOREIGN KEY (\`regionId\`) REFERENCES \`region\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`DROP TABLE \`token\``);
    }

}
