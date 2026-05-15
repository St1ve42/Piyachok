import {IBaseQuery} from "@/src/interfaces/shared/IBaseQuery";

export interface IGeneralQuery extends IBaseQuery {
    [key: string]: unknown

    sort?: Record<string, 'asc' | 'desc'>;

    range?: Record<string, { gte?: number; lte?: number; gt?: number; lt?: number }>;
}

