import { PickType } from '@nestjs/swagger';
import { UserPresenter } from './user.presenter';

export class ShortUserInfoPresenter extends PickType(UserPresenter, [
    'id',
    'name',
    'surname',
    'photo',
]) {}
