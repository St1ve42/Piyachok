import { ApiProperty, PickType } from '@nestjs/swagger';
import { SignUpDto } from './sign-up.dto';
import { IsString } from 'class-validator';

export class ChangePasswordDto extends PickType(SignUpDto, ['password']) {
    @ApiProperty({ example: 'StrongPassword123!' })
    @IsString()
    oldPassword: string;
}
