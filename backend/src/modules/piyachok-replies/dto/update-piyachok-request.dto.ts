import { CreatePiyachokReplyDto } from './create-piyachok-request.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdatePiyachokReplyDto extends OmitType(
    PartialType(CreatePiyachokReplyDto),
    ['piyachokId'],
) {}
