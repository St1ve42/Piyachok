export interface IFullData<T> {
    limit: number;
    page: number;
    skip: number;
    data: T;
    total: number;
}