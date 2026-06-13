import { Expose, Type } from 'class-transformer';
import { RegionPresenter } from '../../regions/presenters/region.presenter';

export class CityPresenter {
    @Expose()
    name: string;

    @Expose()
    @Type(() => RegionPresenter)
    region: RegionPresenter;
}
