import { Expose } from 'class-transformer';

export class CityPresenter {
    @Expose()
    name: string;
}
