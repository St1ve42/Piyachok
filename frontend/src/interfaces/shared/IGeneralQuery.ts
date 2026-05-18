import {IBaseQuery} from "@/src/interfaces/shared/IBaseQuery";

export interface IGeneralQuery extends IBaseQuery {
    [key: string]: unknown

    sort?: 'asc' | 'desc';

    sortBy?: string;
}

