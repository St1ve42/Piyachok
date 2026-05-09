import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Ролі')
@Controller()
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @ApiOperation({
        summary: 'Отримання списку всіх ролей',
        description:
            'Повертає список всіх доступних ролей в системі. Ролі використовуються для розподілу прав доступу користувачів.',
    })
    @ApiOkResponse({
        description: 'Успішно отримано список ролей',
        type: [Role],
    })
    @Get()
    async find(): Promise<Role[]> {
        return this.rolesService.find();
    }
}
