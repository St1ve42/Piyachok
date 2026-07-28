export interface IBaseFullData {
    limit: number;
    page: number;
    skip: number;
    total: number;
    totalPages: number;
}

export interface IFullData<T> extends IBaseFullData{
    data: T[];
}

export interface IFullDataWithoutArray<T> extends IBaseFullData {
    data: T;
}