import { PickType } from '@nestjs/swagger';
import { SignUpDto } from './sign-up.dto';
import { ProviderEnum } from '../../../shared/enums/provider.enum';

export class ResponseUserFromServiceDto extends PickType(SignUpDto, [
  'email',
  'phone',
]) {
  photo?: string;
  isActive?: boolean;
  provider: ProviderEnum;
}
