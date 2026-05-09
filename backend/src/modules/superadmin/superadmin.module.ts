import { Module } from '@nestjs/common';
import { ProtectedUsersModule } from '../protected-users/protected-users.module';
import { ProtectedFoodAndDrinkModule } from '../protected-food-and-drink/protected-food-and-drink.module';
import { RolesModule } from '../roles/roles.module';

@Module({
    imports: [ProtectedUsersModule, ProtectedFoodAndDrinkModule, RolesModule],
    controllers: [],
    providers: [],
})
export class SuperadminModule {}
