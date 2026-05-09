import { PartialType, PickType } from '@nestjs/swagger';
import { SignUpDto } from '../../auth/dto/sign-up.dto';

export class UserSearchDto extends PartialType(
    PickType(SignUpDto, ['name', 'email']),
) {}
