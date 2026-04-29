import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { CitiesModule } from '../cities/cities.module';
import { RegionsModule } from '../regions/regions.module';
import { FoodAndDrinkModule } from '../food-and-drink/food-and-drink.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role]),
        CitiesModule,
        RegionsModule,
        FoodAndDrinkModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
