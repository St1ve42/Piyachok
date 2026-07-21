import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewsANDFoodAndDrinkTopCategoriesANDPiyachokANDPiyachokReplyTables1784050194214 implements MigrationInterface {
    name =
        'AddNewsANDFoodAndDrinkTopCategoriesANDPiyachokANDPiyachokReplyTables1784050194214';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`piyachok_reply\` (\`id\` varchar(36) NOT NULL, \`text\` text NOT NULL, \`piyachokId\` varchar(255) NOT NULL, \`responderId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`piyachok\` (\`id\` varchar(36) NOT NULL, \`meetDate\` date NOT NULL, \`meetTime\` time NOT NULL, \`purpose\` text NOT NULL, \`targetGender\` enum ('male', 'female') NOT NULL, \`peopleCount\` int NOT NULL, \`paymentType\` enum ('split', 'creator_pays', 'guest_pays') NOT NULL, \`budget\` int NOT NULL, \`status\` enum ('active', 'completed', 'cancelled') NOT NULL DEFAULT 'active', \`foodAndDrinkId\` varchar(255) NOT NULL, \`creatorId\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_30a6acf280e8e9aa9166d244e5\` (\`creatorId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`news\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`text\` text NOT NULL, \`photo\` varchar(255) NOT NULL, \`category\` enum ('general', 'sale', 'event') NOT NULL DEFAULT 'general', \`isPromoted\` tinyint NOT NULL DEFAULT 0, \`foodAndDrinkId\` varchar(255) NOT NULL, INDEX \`IDX_2e612e944ee6d20447876ca04a\` (\`category\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`food_and_drink_top_category\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, INDEX \`IDX_9e2a71c3c8de71f63cc9ab2425\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`food_and_drink_top_categories_food_and_drink_top_category\` (\`foodAndDrinkId\` varchar(36) NOT NULL, \`foodAndDrinkTopCategoryId\` varchar(36) NOT NULL, INDEX \`IDX_9b2d3921632c6c9451430b44e6\` (\`foodAndDrinkId\`), INDEX \`IDX_5a14f7b287b39a686362b4ae52\` (\`foodAndDrinkTopCategoryId\`), PRIMARY KEY (\`foodAndDrinkId\`, \`foodAndDrinkTopCategoryId\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP COLUMN \`isDeleted\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD \`isTop\` tinyint NOT NULL DEFAULT 0`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP FOREIGN KEY \`FK_0ab7f401607d565ba87c291c8af\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD UNIQUE INDEX \`IDX_0ab7f401607d565ba87c291c8a\` (\`ownerId\`)`,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_2e612e944ee6d20447876ca04a\` ON \`news\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`news\` DROP COLUMN \`category\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`news\` ADD \`category\` enum ('general', 'sale', 'event') NOT NULL DEFAULT 'general'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` DROP COLUMN \`targetGender\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` ADD \`targetGender\` enum ('male', 'female') NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` DROP COLUMN \`paymentType\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` ADD \`paymentType\` enum ('split', 'creator_pays', 'guest_pays') NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` DROP COLUMN \`status\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` ADD \`status\` enum ('active', 'completed', 'cancelled') NOT NULL DEFAULT 'active'`,
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
            `ALTER TABLE \`piyachok_reply\` ADD CONSTRAINT \`FK_11fdf4d4ddbc8ecaf77e66fc4b7\` FOREIGN KEY (\`piyachokId\`) REFERENCES \`piyachok\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok_reply\` ADD CONSTRAINT \`FK_6a946e9e2cc3562678184c4e2df\` FOREIGN KEY (\`responderId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` ADD CONSTRAINT \`FK_1522925c36ac1ba0d7c90b1c6c7\` FOREIGN KEY (\`foodAndDrinkId\`) REFERENCES \`food_and_drink\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` ADD CONSTRAINT \`FK_30a6acf280e8e9aa9166d244e55\` FOREIGN KEY (\`creatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`news\` ADD CONSTRAINT \`FK_91f9ff6b9b455d624015974f5b5\` FOREIGN KEY (\`foodAndDrinkId\`) REFERENCES \`food_and_drink\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD CONSTRAINT \`FK_0ab7f401607d565ba87c291c8af\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink_top_categories_food_and_drink_top_category\` ADD CONSTRAINT \`FK_9b2d3921632c6c9451430b44e61\` FOREIGN KEY (\`foodAndDrinkId\`) REFERENCES \`food_and_drink\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink_top_categories_food_and_drink_top_category\` ADD CONSTRAINT \`FK_5a14f7b287b39a686362b4ae525\` FOREIGN KEY (\`foodAndDrinkTopCategoryId\`) REFERENCES \`food_and_drink_top_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink_top_categories_food_and_drink_top_category\` DROP FOREIGN KEY \`FK_5a14f7b287b39a686362b4ae525\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink_top_categories_food_and_drink_top_category\` DROP FOREIGN KEY \`FK_9b2d3921632c6c9451430b44e61\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP FOREIGN KEY \`FK_0ab7f401607d565ba87c291c8af\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`news\` DROP FOREIGN KEY \`FK_91f9ff6b9b455d624015974f5b5\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` DROP FOREIGN KEY \`FK_30a6acf280e8e9aa9166d244e55\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` DROP FOREIGN KEY \`FK_1522925c36ac1ba0d7c90b1c6c7\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok_reply\` DROP FOREIGN KEY \`FK_6a946e9e2cc3562678184c4e2df\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok_reply\` DROP FOREIGN KEY \`FK_11fdf4d4ddbc8ecaf77e66fc4b7\``,
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
            `ALTER TABLE \`piyachok\` DROP COLUMN \`status\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` ADD \`status\` enum ('active', 'completed', 'cancelled') NOT NULL DEFAULT 'active'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` DROP COLUMN \`paymentType\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` ADD \`paymentType\` enum ('split', 'creator_pays', 'guest_pays') NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` DROP COLUMN \`targetGender\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` ADD \`targetGender\` enum ('male', 'female') NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`news\` DROP COLUMN \`category\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`news\` ADD \`category\` enum ('general', 'sale', 'event') NOT NULL DEFAULT 'general'`,
        );
        await queryRunner.query(
            `CREATE INDEX \`IDX_2e612e944ee6d20447876ca04a\` ON \`news\` (\`category\`)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP INDEX \`IDX_0ab7f401607d565ba87c291c8a\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD CONSTRAINT \`FK_0ab7f401607d565ba87c291c8af\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP COLUMN \`isTop\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD \`isDeleted\` tinyint NOT NULL DEFAULT '0'`,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_5a14f7b287b39a686362b4ae52\` ON \`food_and_drink_top_categories_food_and_drink_top_category\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_9b2d3921632c6c9451430b44e6\` ON \`food_and_drink_top_categories_food_and_drink_top_category\``,
        );
        await queryRunner.query(
            `DROP TABLE \`food_and_drink_top_categories_food_and_drink_top_category\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_9e2a71c3c8de71f63cc9ab2425\` ON \`food_and_drink_top_category\``,
        );
        await queryRunner.query(`DROP TABLE \`food_and_drink_top_category\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_2e612e944ee6d20447876ca04a\` ON \`news\``,
        );
        await queryRunner.query(`DROP TABLE \`news\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_30a6acf280e8e9aa9166d244e5\` ON \`piyachok\``,
        );
        await queryRunner.query(`DROP TABLE \`piyachok\``);
        await queryRunner.query(`DROP TABLE \`piyachok_reply\``);
    }
}
