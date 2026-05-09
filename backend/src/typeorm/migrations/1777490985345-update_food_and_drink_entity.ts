import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateFoodAndDrinkEntity1777490985345 implements MigrationInterface {
    name = 'UpdateFoodAndDrinkEntity1777490985345';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX \`IDX_47f997e0f8223cc34a04eb5a96\` ON \`food_and_drink\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP COLUMN \`location\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD \`location\` json NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP COLUMN \`businessHours\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD \`businessHours\` json NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD CONSTRAINT \`FK_a140a990616449223f8bf5a3faf\` FOREIGN KEY (\`cityId\`) REFERENCES \`city\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD CONSTRAINT \`FK_0ab7f401607d565ba87c291c8af\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD CONSTRAINT \`FK_a0a2675b91a68a875b236efc6b9\` FOREIGN KEY (\`managerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP FOREIGN KEY \`FK_a0a2675b91a68a875b236efc6b9\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP FOREIGN KEY \`FK_0ab7f401607d565ba87c291c8af\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP FOREIGN KEY \`FK_a140a990616449223f8bf5a3faf\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP COLUMN \`businessHours\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD \`businessHours\` varchar(255) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP COLUMN \`location\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD \`location\` varchar(255) NOT NULL`,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX \`IDX_47f997e0f8223cc34a04eb5a96\` ON \`food_and_drink\` (\`location\`)`,
        );
    }
}
