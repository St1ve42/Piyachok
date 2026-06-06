import { Module } from '@nestjs/common';
import { SuperadminUsersModule } from '../protected-users/superadmin-users.module';
import { SuperadminFoodAndDrinkModule } from '../protected-food-and-drink/superadmin-food-and-drink.module';
import { RolesModule } from '../roles/roles.module';

@Module({
    imports: [SuperadminUsersModule, SuperadminFoodAndDrinkModule, RolesModule],
    controllers: [],
    providers: [],
})
export class SuperadminModule {}
