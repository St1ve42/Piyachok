import { CreatePiyachokDto } from './create-piyachok.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdatePiyachokDto extends OmitType(
    PartialType(CreatePiyachokDto),
    ['foodAndDrinkId'],
) {}
