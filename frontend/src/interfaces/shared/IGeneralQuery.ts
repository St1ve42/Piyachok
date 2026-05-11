import {IBaseQuery} from "@/src/interfaces/shared/IBaseQuery";

export interface IGeneralQuery extends IBaseQuery {
    search?: Record<string, unknown>;

    sort?: Record<string, 'asc' | 'desc'>;

    range?: Record<string, { gte?: number; lte?: number; gt?: number; lt?: number }>;
}

