import { SignUpDto } from './sign-up.dto';
import { PickType } from '@nestjs/swagger';

export class SignInDto extends PickType(SignUpDto, ['email', 'password']) {}
