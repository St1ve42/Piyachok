import { OmitType } from '@nestjs/swagger';
import { SignUpDto } from './sign-up.dto';

export class SignUpWithServiceDto extends OmitType(SignUpDto, [
    'password',
    'email',
    'phone',
    'gender',
]) {}
