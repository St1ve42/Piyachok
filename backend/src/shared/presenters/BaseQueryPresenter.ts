import { Expose } from 'class-transformer';

export class BaseQueryPresenter {
    @Expose()
    page: number;
    @Expose()
    limit: number;
    @Expose()
    skip: number;

    constructor(baseQuery: Partial<BaseQueryPresenter>) {
        Object.assign(this, baseQuery);
    }
}
