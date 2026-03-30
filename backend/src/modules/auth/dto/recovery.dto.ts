import { PickType } from '@nestjs/swagger';
import { SignUpDto } from './sign-up.dto';

export class RecoveryDto extends PickType(SignUpDto, ['password']) {}
