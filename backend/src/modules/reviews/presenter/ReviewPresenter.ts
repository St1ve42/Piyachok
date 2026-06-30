import { Expose } from 'class-transformer';

export class ReviewPresenter {
    @Expose()
    id: string;
    @Expose()
    rating: number;
    @Expose()
    text: string;
    @Expose()
    averageReceipt: number;
    @Expose()
    createdAt: Date;
}
