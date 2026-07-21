import { GenderEnum } from '../enums/gender.enum';
import { Expose, Transform, Type } from 'class-transformer';
import { RolePresenter } from '../../roles/presenter/role.presenter';
import { CityPresenter } from '../../cities/presenters/city.presenter';
import { RegionPresenter } from '../../regions/presenters/region.presenter';
import { ApiProperty } from '@nestjs/swagger';

export class UserPresenter {
    @ApiProperty({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        description: 'Унікальний ідентифікатор користувача (UUID)',
    })
    @Expose()
    id: string;

    @ApiProperty({
        example: 'Олександр',
        description: "Ім'я користувача",
    })
    @Expose()
    name: string;

    @ApiProperty({
        example: 'Петренко',
        description: 'Прізвище користувача',
    })
    @Expose()
    surname: string;

    @ApiProperty({
        example: 30,
        description: 'Вік користувача',
    })
    @Expose()
    age: number;

    @ApiProperty({
        example: 'oleksandr.petrenko@example.com',
        description: 'Email користувача',
        required: false,
    })
    @Expose()
    email?: string;

    @ApiProperty({
        example: 'user/f47ac10b-58cc-4372-a567-0e02b2c3d479/photo.jpg',
        description: 'URL фотографії профілю',
        required: false,
    })
    @Expose()
    photo?: string | null;

    @ApiProperty({
        example: '+380501234567',
        description: 'Телефон користувача',
        required: false,
    })
    @Expose()
    phone?: string | null;

    @ApiProperty({
        example: 'male',
        enum: ['male', 'female', 'other'],
        description: 'Стать користувача',
        required: false,
    })
    @Expose()
    gender?: GenderEnum | null;

    @ApiProperty({
        example: 'superadmin',
        description: 'Роль користувача',
    })
    @Expose()
    @Transform(({ value }: { value: RolePresenter }) => value.name, {
        toPlainOnly: true,
    })
    @Type(() => RolePresenter)
    role: RolePresenter;

    @ApiProperty({
        example: 'Київ',
        description: 'Місто постійного проживання користувача',
    })
    @Expose()
    @Transform(({ value }: { value: CityPresenter }) => value.name, {
        toPlainOnly: true,
    })
    @Type(() => CityPresenter)
    city: CityPresenter;

    @ApiProperty({
        example: 'Київська область',
        description: 'Регіон постійного проживання користувача',
    })
    @Expose()
    @Transform(({ value }: { value: RegionPresenter }) => value.name, {
        toPlainOnly: true,
    })
    @Type(() => RegionPresenter)
    region: RegionPresenter;

    @ApiProperty({
        example: true,
        description: 'Чи верифіковано користувача через email',
    })
    @Expose()
    isVerified: boolean;

    @ApiProperty({
        example: true,
        description: 'Чи активний акаунт користувача',
    })
    @Expose()
    isActive: boolean;

    @ApiProperty({
        example: false,
        description: "Чи видалено акаунт користувача (м'яке видалення)",
    })
    @Expose()
    isDeleted: boolean;

    @ApiProperty({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        description: 'Унікальний ідентифікатор закладу',
    })
    @Expose()
    @Transform(
        ({ value }: { value: string | null }) => {
            if (value) {
                return { id: value };
            }
            return value;
        },
        { toClassOnly: true },
    )
    ownerOf: string;
}
