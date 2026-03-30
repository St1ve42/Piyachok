import { PickType } from '@nestjs/swagger';
import { SignUpDto } from './sign-up.dto';
import { IsString } from 'class-validator';

export class ChangePasswordDto extends PickType(SignUpDto, ['password']) {
  @IsString()
  oldPassword: string;
}
