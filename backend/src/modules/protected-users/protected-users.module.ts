import { Module } from '@nestjs/common';
import { ProtectedUsersController } from './protected-users.controller';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [UsersModule],
    controllers: [ProtectedUsersController],
    providers: [],
})
export class ProtectedUsersModule {}
