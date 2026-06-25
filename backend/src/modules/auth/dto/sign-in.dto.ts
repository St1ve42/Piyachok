import { SignUpDto } from './sign-up.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto extends PickType(SignUpDto, ['email']) {
    @ApiProperty({ example: 'StrongPassword123!' })
    @IsString()
    password: string;
}
