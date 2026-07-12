import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailAndChangeRelationOfManagersInFoodAndDrink1783362092078 implements MigrationInterface {
    name = 'AddEmailAndChangeRelationOfManagersInFoodAndDrink1783362092078';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP FOREIGN KEY \`FK_a0a2675b91a68a875b236efc6b9\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_3738be96360786b3fe56e3b7060\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` CHANGE \`managerId\` \`email\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` CHANGE \`email\` \`managerId\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP COLUMN \`managerId\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`user\` DROP COLUMN \`managerOfId\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD \`email\` varchar(255) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD UNIQUE INDEX \`IDX_d05c7d9db6a5a1b0c98ac56b46\` (\`email\`)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user\` ADD \`managedFoodAndDrinkId\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user\` ADD \`managerOfFoodAndDrinkId\` varchar(36) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD \`managerId\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user\` ADD \`managerOfId\` varchar(36) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_f68e7a6385ad055c9200865b0c0\` FOREIGN KEY (\`managerOfFoodAndDrinkId\`) REFERENCES \`food_and_drink\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD CONSTRAINT \`FK_a0a2675b91a68a875b236efc6b9\` FOREIGN KEY (\`managerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_3738be96360786b3fe56e3b7060\` FOREIGN KEY (\`managerOfId\`) REFERENCES \`food_and_drink\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_3738be96360786b3fe56e3b7060\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP FOREIGN KEY \`FK_a0a2675b91a68a875b236efc6b9\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_f68e7a6385ad055c9200865b0c0\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`user\` DROP COLUMN \`managerOfId\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP COLUMN \`managerId\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`user\` DROP COLUMN \`managerOfFoodAndDrinkId\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`user\` DROP COLUMN \`managedFoodAndDrinkId\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP INDEX \`IDX_d05c7d9db6a5a1b0c98ac56b46\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP COLUMN \`email\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`user\` ADD \`managerOfId\` varchar(36) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD \`managerId\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` CHANGE \`managerId\` \`email\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` CHANGE \`email\` \`managerId\` varchar(255) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_3738be96360786b3fe56e3b7060\` FOREIGN KEY (\`managerOfId\`) REFERENCES \`food_and_drink\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD CONSTRAINT \`FK_a0a2675b91a68a875b236efc6b9\` FOREIGN KEY (\`managerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
