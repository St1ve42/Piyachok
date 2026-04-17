import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @ApiOperation({ summary: 'Список всіх ролей' })
    @ApiOkResponse({
        description: 'Успіх',
        type: User,
    })
    @Get()
    async find(): Promise<Role[]> {
        return this.rolesService.find();
    }
}
