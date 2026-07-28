import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMissingCreatedAtAndUpdatedAtColumnsInTables1784119033714 implements MigrationInterface {
    name = 'AddMissingCreatedAtAndUpdatedAtColumnsInTables1784119033714';

    transaction = false;

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.startTransaction();
        try {
            await queryRunner.query(
                `ALTER TABLE \`news\` DROP FOREIGN KEY \`news_ibfk_1\``,
            );
            await queryRunner.query(
                `DROP INDEX \`foodAndDrinkId\` ON \`news\``,
            );
            await queryRunner.query(
                `DROP INDEX \`piyachokId\` ON \`piyachok_reply\``,
            );
            await queryRunner.query(
                `DROP INDEX \`foodAndDrinkId\` ON \`piyachok\``,
            );
            await queryRunner.query(
                `DROP INDEX \`IDX_0ab7f401607d565ba87c291c8a\` ON \`food_and_drink\``,
            );
            await queryRunner.query(
                `ALTER TABLE \`news\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
            );
            await queryRunner.query(
                `ALTER TABLE \`news\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
            );
            await queryRunner.query(
                `ALTER TABLE \`piyachok_reply\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
            );
            await queryRunner.query(
                `ALTER TABLE \`piyachok_reply\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
            );
            await queryRunner.query(
                `ALTER TABLE \`piyachok\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
            );
            await queryRunner.query(
                `ALTER TABLE \`piyachok\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
            );
            await queryRunner.query(
                `ALTER TABLE \`news\` CHANGE \`photo\` \`photo\` varchar(255) NULL`,
            );
            await queryRunner.query(
                `ALTER TABLE \`food_and_drink\` ADD UNIQUE INDEX \`IDX_0ab7f401607d565ba87c291c8a\` (\`ownerId\`)`,
            );
            await queryRunner.query(
                `CREATE INDEX \`IDX_2e612e944ee6d20447876ca04a\` ON \`news\` (\`category\`)`,
            );
            await queryRunner.query(
                `CREATE UNIQUE INDEX \`REL_0ab7f401607d565ba87c291c8a\` ON \`food_and_drink\` (\`ownerId\`)`,
            );
            await queryRunner.query(
                `ALTER TABLE \`news\` ADD CONSTRAINT \`FK_91f9ff6b9b455d624015974f5b5\` FOREIGN KEY (\`foodAndDrinkId\`) REFERENCES \`food_and_drink\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
            );
            await queryRunner.commitTransaction();
            await queryRunner.query(
                `ALTER TABLE \`food_and_drink\` ADD CONSTRAINT \`FK_0ab7f401607d565ba87c291c8af\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
            );
        } catch (e) {
            await queryRunner.rollbackTransaction();
            throw e;
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP FOREIGN KEY \`FK_0ab7f401607d565ba87c291c8af\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`news\` DROP FOREIGN KEY \`FK_91f9ff6b9b455d624015974f5b5\``,
        );
        await queryRunner.query(
            `DROP INDEX \`REL_0ab7f401607d565ba87c291c8a\` ON \`food_and_drink\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_2e612e944ee6d20447876ca04a\` ON \`news\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP INDEX \`IDX_0ab7f401607d565ba87c291c8a\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`news\` CHANGE \`photo\` \`photo\` varchar(255) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` DROP COLUMN \`updatedAt\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` DROP COLUMN \`createdAt\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok_reply\` DROP COLUMN \`updatedAt\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok_reply\` DROP COLUMN \`createdAt\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`news\` DROP COLUMN \`updatedAt\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`news\` DROP COLUMN \`createdAt\``,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX \`IDX_0ab7f401607d565ba87c291c8a\` ON \`food_and_drink\` (\`ownerId\`)`,
        );
        await queryRunner.query(
            `CREATE INDEX \`foodAndDrinkId\` ON \`piyachok\` (\`foodAndDrinkId\`)`,
        );
        await queryRunner.query(
            `CREATE INDEX \`piyachokId\` ON \`piyachok_reply\` (\`piyachokId\`)`,
        );
        await queryRunner.query(
            `CREATE INDEX \`foodAndDrinkId\` ON \`news\` (\`foodAndDrinkId\`)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`news\` ADD CONSTRAINT \`news_ibfk_1\` FOREIGN KEY (\`foodAndDrinkId\`) REFERENCES \`food_and_drink\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }
}
