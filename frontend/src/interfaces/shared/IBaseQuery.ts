export interface IBaseQuery{
    page?: number,
    limit?: number,
    skip?: number,
}

export interface IRegionCityQuery extends IBaseQuery{
    search?: string
}

export interface IFoodAndDrinkQuery extends IBaseQuery{
    [key: string]: unknown
    sort?: 'asc' | 'desc'
    sortBy?: string
}

