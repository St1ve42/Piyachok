import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReviewAndCommentTables1782643981515 implements MigrationInterface {
    name = 'CreateReviewAndCommentTables1782643981515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`review\` (\`id\` varchar(36) NOT NULL, \`rating\` int NOT NULL, \`text\` varchar(255) NOT NULL, \`averageReceipt\` int NOT NULL, \`foodAndDrinkId\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_517db8563cd6b31faa1ce28003\` (\`userId\`, \`foodAndDrinkId\`), INDEX \`IDX_0201e84944855bf81c56b2b245\` (\`foodAndDrinkId\`, \`rating\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` varchar(36) NOT NULL, \`text\` varchar(255) NOT NULL, \`foodAndDrinkId\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_6aed041d027bb7b2dcfe4aa2a0\` (\`foodAndDrinkId\`), INDEX \`IDX_c0354a9a009d3bb45a08655ce3\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_da7512ae282e51f8cb2fa95f254\` FOREIGN KEY (\`foodAndDrinkId\`) REFERENCES \`food_and_drink\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_1337f93918c70837d3cea105d39\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_6aed041d027bb7b2dcfe4aa2a0d\` FOREIGN KEY (\`foodAndDrinkId\`) REFERENCES \`food_and_drink\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_6aed041d027bb7b2dcfe4aa2a0d\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_1337f93918c70837d3cea105d39\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_da7512ae282e51f8cb2fa95f254\``);
        await queryRunner.query(`DROP INDEX \`IDX_c0354a9a009d3bb45a08655ce3\` ON \`comment\``);
        await queryRunner.query(`DROP INDEX \`IDX_6aed041d027bb7b2dcfe4aa2a0\` ON \`comment\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
        await queryRunner.query(`DROP INDEX \`IDX_0201e84944855bf81c56b2b245\` ON \`review\``);
        await queryRunner.query(`DROP INDEX \`IDX_517db8563cd6b31faa1ce28003\` ON \`review\``);
        await queryRunner.query(`DROP TABLE \`review\``);
    }

}
