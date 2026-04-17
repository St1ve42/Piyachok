import { OmitType } from '@nestjs/swagger';
import { SignUpDto } from './sign-up.dto';
import { ProviderEnum } from '../../../shared/enums/provider.enum';

export class SignUpWithServiceDto extends OmitType(SignUpDto, ['password']) {
    provider: ProviderEnum;
    isActive: boolean;
}

export class SignUpWithServiceTestDto extends OmitType(SignUpDto, [
    'password',
    'email',
    'phone',
    'gender',
]) {}
