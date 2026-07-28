import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOnDeleteCascadeToRelations1784051544949 implements MigrationInterface {
    name = 'AddOnDeleteCascadeToRelations1784051544949';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX \`IDX_0ab7f401607d565ba87c291c8a\` ON \`food_and_drink\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD UNIQUE INDEX \`IDX_0ab7f401607d565ba87c291c8a\` (\`ownerId\`)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`news\` DROP COLUMN \`category\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`news\` ADD \`category\` varchar(255) ('general', 'sale', 'event') NOT NULL DEFAULT 'general'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` DROP COLUMN \`targetGender\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` ADD \`targetGender\` varchar(255) ('male', 'female') NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` DROP COLUMN \`paymentType\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` ADD \`paymentType\` varchar(255) ('split', 'creator_pays', 'guest_pays') NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` DROP COLUMN \`status\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` ADD \`status\` varchar(255) ('active', 'completed', 'cancelled') NOT NULL DEFAULT 'active'`,
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
        await queryRunner.query(
            `ALTER TABLE \`piyachok_reply\` ADD CONSTRAINT \`FK_11fdf4d4ddbc8ecaf77e66fc4b7\` FOREIGN KEY (\`piyachokId\`) REFERENCES \`piyachok\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok_reply\` ADD CONSTRAINT \`FK_6a946e9e2cc3562678184c4e2df\` FOREIGN KEY (\`responderId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` ADD CONSTRAINT \`FK_1522925c36ac1ba0d7c90b1c6c7\` FOREIGN KEY (\`foodAndDrinkId\`) REFERENCES \`food_and_drink\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`piyachok\` ADD CONSTRAINT \`FK_30a6acf280e8e9aa9166d244e55\` FOREIGN KEY (\`creatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD CONSTRAINT \`FK_0ab7f401607d565ba87c291c8af\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP FOREIGN KEY \`FK_0ab7f401607d565ba87c291c8af\``,
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
            `ALTER TABLE \`food_and_drink\` DROP INDEX \`IDX_0ab7f401607d565ba87c291c8a\``,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX \`IDX_0ab7f401607d565ba87c291c8a\` ON \`food_and_drink\` (\`ownerId\`)`,
        );
    }
}
