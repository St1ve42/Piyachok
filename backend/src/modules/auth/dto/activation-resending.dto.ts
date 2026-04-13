import { PickType } from '@nestjs/swagger';
import { SignUpDto } from './sign-up.dto';

export class ActivationResendingDto extends PickType(SignUpDto, ['email']) {}
