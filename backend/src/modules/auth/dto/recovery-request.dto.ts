import { PickType } from '@nestjs/swagger';
import { SignUpDto } from './sign-up.dto';

export class RecoveryRequestDto extends PickType(SignUpDto, ['email']) {}
