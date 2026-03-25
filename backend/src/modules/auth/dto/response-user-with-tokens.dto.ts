import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseTokensDto } from './response-tokens.dto';

export class ResponseUserWithTokensDto {
  @ApiProperty({ type: () => User })
  user: User;
  @ApiProperty()
  tokens: ResponseTokensDto;
}
