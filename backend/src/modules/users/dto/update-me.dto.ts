import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateMeDto extends PartialType(
    PickType(CreateUserDto, [
        'name',
        'surname',
        'age',
        'cityId',
        'regionId',
        'gender',
        'phone',
    ]),
) {}
