import { Expose, Transform } from 'class-transformer';

export class ReviewStatisticsPresenter {
    @Expose()
    rating: number;
    @Expose()
    @Transform(({ value }: { value: number }) => Number(value))
    count: number;
}
