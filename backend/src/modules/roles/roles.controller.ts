import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async find(): Promise<Role[]> {
    return this.rolesService.find();
  }
}
