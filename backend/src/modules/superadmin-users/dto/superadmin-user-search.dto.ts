import { PartialType, PickType } from '@nestjs/swagger';
import { SignUpDto } from '../../auth/dto/sign-up.dto';
import { GlobalUserRoleEnum } from '../../users/enums/global.user.role.enum';

export class SuperadminUserSearchDto extends PartialType(
    PickType(SignUpDto, ['name', 'surname', 'email']),
) {
    role: GlobalUserRoleEnum;
}
