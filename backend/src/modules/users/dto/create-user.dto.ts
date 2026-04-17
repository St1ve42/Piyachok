import { ProviderEnum } from '../../../shared/enums/provider.enum';
import { GenderEnum } from '../enums/gender.enum';

export class CreateUserDto {
    name: string;
    surname: string;
    age: number;
    email?: string;
    password?: string;
    provider?: ProviderEnum;
    cityId: number;
    regionId: number;
    gender?: GenderEnum;
    phone?: string;
    photo?: string;
    firebaseUid?: string;
    isActive?: boolean;
    isVerified?: boolean;
}
