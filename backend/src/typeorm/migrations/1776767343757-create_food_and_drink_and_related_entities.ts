import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFoodAndDrinkAndRelatedEntities1776767343757 implements MigrationInterface {
    name = 'CreateFoodAndDrinkAndRelatedEntities1776767343757';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`token\` DROP FOREIGN KEY \`FK_94f168faad896c0786646fa3d4a\``,
        );
        await queryRunner.query(
            `CREATE TABLE \`tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_6a9775008add570dc3e5a0bab7\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`features\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isWifi\` tinyint NULL, \`isParking\` tinyint NULL, \`isLiveMusic\` tinyint NULL, \`is24hrs\` tinyint NULL, \`foodAndDrinkId\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_57ec3bd2e7c81e160029f62a2e\` (\`foodAndDrinkId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`food_and_drink_statistic\` (\`id\` int NOT NULL AUTO_INCREMENT, \`totalViews\` int NOT NULL DEFAULT '0', \`totalFavourites\` int NOT NULL DEFAULT '0', \`foodAndDrinkId\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_884101fba0934f850e436ed575\` (\`foodAndDrinkId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`food_and_drink_views_per_day\` (\`id\` int NOT NULL AUTO_INCREMENT, \`viewsPerDay\` int NOT NULL DEFAULT '0', \`viewDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`foodAndDrinkId\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_92a670c6c3d4ef5c7116264101\` (\`foodAndDrinkId\`, \`viewDate\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`user_view\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`foodAndDrinkId\` varchar(255) NOT NULL, \`viewedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8e418b17c5d3c40612ffa9035b\` (\`userId\`, \`foodAndDrinkId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`food_and_drink\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`type\` enum ('Ресторан', 'Кафе', 'Бар', 'Паб', 'Піцерія', 'Фаст-фуд', 'Пекарня', 'Кав’ярня', 'Бістро', 'Суші-бар', 'Їдальня', 'Кальянна') NOT NULL, \`location\` varchar(255) NOT NULL, \`businessHours\` varchar(255) NOT NULL, \`images\` json NULL, \`mainImage\` varchar(255) NULL, \`phone\` varchar(255) NOT NULL, \`averageReceipt\` int NOT NULL, \`status\` enum ('active', 'pending', 'inactive') NOT NULL DEFAULT 'inactive', \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`site\` varchar(255) NULL, \`rating\` int NULL, \`socialNetworks\` json NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`ownerId\` varchar(255) NOT NULL, \`managerId\` varchar(255) NULL, INDEX \`IDX_da2e70e38b14142783b3f2053b\` (\`averageReceipt\`), INDEX \`IDX_05b7addd01af8af5cb09dfaf1d\` (\`name\`, \`description\`), UNIQUE INDEX \`IDX_30684aa4e1910195f4146594f6\` (\`phone\`), UNIQUE INDEX \`IDX_47f997e0f8223cc34a04eb5a96\` (\`location\`), UNIQUE INDEX \`REL_0ab7f401607d565ba87c291c8a\` (\`ownerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`favourite\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`foodAndDrinkId\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_2b38fa2641ce870308815697d9\` (\`userId\`, \`foodAndDrinkId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`food_and_drink_tags_tag\` (\`foodAndDrinkId\` varchar(36) NOT NULL, \`tagId\` int NOT NULL, INDEX \`IDX_7c2a778bddfb2859dd5e1d5c1e\` (\`foodAndDrinkId\`), INDEX \`IDX_f27d30a691f69e8d84f90381fe\` (\`tagId\`), PRIMARY KEY (\`foodAndDrinkId\`, \`tagId\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user\` ADD \`managerOfId\` varchar(36) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`features\` ADD CONSTRAINT \`FK_57ec3bd2e7c81e160029f62a2e6\` FOREIGN KEY (\`foodAndDrinkId\`) REFERENCES \`food_and_drink\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink_statistic\` ADD CONSTRAINT \`FK_884101fba0934f850e436ed5759\` FOREIGN KEY (\`foodAndDrinkId\`) REFERENCES \`food_and_drink\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink_views_per_day\` ADD CONSTRAINT \`FK_66d369255d0f8aa4547b79e4b9b\` FOREIGN KEY (\`foodAndDrinkId\`) REFERENCES \`food_and_drink\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_view\` ADD CONSTRAINT \`FK_00cbf56a2d2251093753fdbdab2\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_view\` ADD CONSTRAINT \`FK_2a64c6fc686e2c4e6fc7eed0dee\` FOREIGN KEY (\`foodAndDrinkId\`) REFERENCES \`food_and_drink\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` ADD CONSTRAINT \`FK_0ab7f401607d565ba87c291c8af\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_3738be96360786b3fe56e3b7060\` FOREIGN KEY (\`managerOfId\`) REFERENCES \`food_and_drink\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`token\` ADD CONSTRAINT \`FK_94f168faad896c0786646fa3d4a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`favourite\` ADD CONSTRAINT \`FK_55262b1e0fdf72d3443562a9c3d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`favourite\` ADD CONSTRAINT \`FK_b12ea8bb46752d1ae7b5c382cd6\` FOREIGN KEY (\`foodAndDrinkId\`) REFERENCES \`food_and_drink\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink_tags_tag\` ADD CONSTRAINT \`FK_7c2a778bddfb2859dd5e1d5c1ef\` FOREIGN KEY (\`foodAndDrinkId\`) REFERENCES \`food_and_drink\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink_tags_tag\` ADD CONSTRAINT \`FK_f27d30a691f69e8d84f90381fe0\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink_tags_tag\` DROP FOREIGN KEY \`FK_f27d30a691f69e8d84f90381fe0\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink_tags_tag\` DROP FOREIGN KEY \`FK_7c2a778bddfb2859dd5e1d5c1ef\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`favourite\` DROP FOREIGN KEY \`FK_b12ea8bb46752d1ae7b5c382cd6\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`favourite\` DROP FOREIGN KEY \`FK_55262b1e0fdf72d3443562a9c3d\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`token\` DROP FOREIGN KEY \`FK_94f168faad896c0786646fa3d4a\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_3738be96360786b3fe56e3b7060\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink\` DROP FOREIGN KEY \`FK_0ab7f401607d565ba87c291c8af\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_view\` DROP FOREIGN KEY \`FK_2a64c6fc686e2c4e6fc7eed0dee\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_view\` DROP FOREIGN KEY \`FK_00cbf56a2d2251093753fdbdab2\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink_views_per_day\` DROP FOREIGN KEY \`FK_66d369255d0f8aa4547b79e4b9b\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`food_and_drink_statistic\` DROP FOREIGN KEY \`FK_884101fba0934f850e436ed5759\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`features\` DROP FOREIGN KEY \`FK_57ec3bd2e7c81e160029f62a2e6\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`user\` DROP COLUMN \`managerOfId\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_f27d30a691f69e8d84f90381fe\` ON \`food_and_drink_tags_tag\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_7c2a778bddfb2859dd5e1d5c1e\` ON \`food_and_drink_tags_tag\``,
        );
        await queryRunner.query(`DROP TABLE \`food_and_drink_tags_tag\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_2b38fa2641ce870308815697d9\` ON \`favourite\``,
        );
        await queryRunner.query(`DROP TABLE \`favourite\``);
        await queryRunner.query(
            `DROP INDEX \`REL_0ab7f401607d565ba87c291c8a\` ON \`food_and_drink\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_47f997e0f8223cc34a04eb5a96\` ON \`food_and_drink\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_30684aa4e1910195f4146594f6\` ON \`food_and_drink\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_05b7addd01af8af5cb09dfaf1d\` ON \`food_and_drink\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_da2e70e38b14142783b3f2053b\` ON \`food_and_drink\``,
        );
        await queryRunner.query(`DROP TABLE \`food_and_drink\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_8e418b17c5d3c40612ffa9035b\` ON \`user_view\``,
        );
        await queryRunner.query(`DROP TABLE \`user_view\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_92a670c6c3d4ef5c7116264101\` ON \`food_and_drink_views_per_day\``,
        );
        await queryRunner.query(`DROP TABLE \`food_and_drink_views_per_day\``);
        await queryRunner.query(
            `DROP INDEX \`REL_884101fba0934f850e436ed575\` ON \`food_and_drink_statistic\``,
        );
        await queryRunner.query(`DROP TABLE \`food_and_drink_statistic\``);
        await queryRunner.query(
            `DROP INDEX \`REL_57ec3bd2e7c81e160029f62a2e\` ON \`features\``,
        );
        await queryRunner.query(`DROP TABLE \`features\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_6a9775008add570dc3e5a0bab7\` ON \`tag\``,
        );
        await queryRunner.query(`DROP TABLE \`tag\``);
        await queryRunner.query(
            `ALTER TABLE \`token\` ADD CONSTRAINT \`FK_94f168faad896c0786646fa3d4a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
