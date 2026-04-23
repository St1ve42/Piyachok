import { Expose } from 'class-transformer';
import { Features } from '../entities/features.entity';

export class FeaturePresenter {
    @Expose()
    isWifi: boolean | null;
    @Expose()
    isParking: boolean | null;
    @Expose()
    isLiveMusic: boolean | null;
    @Expose()
    is24hrs: boolean | null;

    constructor(features: Partial<Features>) {
        Object.assign(this, {
            features,
        });
    }
}
