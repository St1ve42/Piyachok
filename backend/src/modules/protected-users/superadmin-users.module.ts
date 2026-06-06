import { Module } from '@nestjs/common';
import { SuperadminUsersController } from './superadmin-users.controller';
import { UsersModule } from '../users/users.module';
import { FoodAndDrinkModule } from '../food-and-drink/food-and-drink.module';

@Module({
    imports: [UsersModule, FoodAndDrinkModule],
    controllers: [SuperadminUsersController],
    providers: [],
})
export class SuperadminUsersModule {}
