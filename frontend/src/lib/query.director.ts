import { QueryBuilder } from './query.builder';
import { IGeneralQuery } from '@/src/interfaces/shared/IGeneralQuery';
import {IBaseQuery} from "@/src/interfaces/shared/IBaseQuery";

export class QueryDirector {
    private queryBuilder: QueryBuilder;

    constructor(
        private endpoint: string,
        private query?: IGeneralQuery | IBaseQuery,
    ) {
        this.queryBuilder = new QueryBuilder(this.endpoint, this.query?.page);
    }

    build(): string {
        if (!this.query) {
            return this.queryBuilder.build();
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const {page, skip, limit, sort, sortBy, ...search} = this.query
        
        if (limit) {
            this.queryBuilder.addLimit(limit);
        }

        if (skip) {
            this.queryBuilder.addSkip(skip);
        }

        if (search && Object.keys(search).length > 0) {
            this.queryBuilder.addSearch(search);
        }

        if(sort){
            this.queryBuilder.addSort(sort);
        }

        if (sortBy) {
            this.queryBuilder.addSortBy(sortBy);
        }


        return this.queryBuilder.build();
    }
}