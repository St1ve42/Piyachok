import {FoodAndDrinkTypeEnum} from "@/src/enums/food-and-drink/food-and-drink-type.enum";
import {GlobalUserRoleEnum} from "@/src/enums/user/global.user.role.enum";
import {NewsCategoryEnum} from "@/src/enums/news/news-category.enum";

export interface IBaseQuery{
    page?: number,
    limit?: number,
    skip?: number,
}

export interface IRegionCityQuery extends IBaseQuery{
    [key: string]: unknown
    search?: string
}

export interface IFoodAndDrinkQuery extends IBaseQuery{
    [key: string]: unknown
    name?: string
    type?: FoodAndDrinkTypeEnum
    rating?: number
    tag?: string
    averageReceipt?: {gte: number, lte: number}
    sort?: 'asc' | 'desc'
    sortBy?: string
}

export interface IUsersQuery extends IBaseQuery{
    [key: string]: unknown
    name?: string
    surname?: string
    email?: string,
    role?: GlobalUserRoleEnum
    sortBy?: string,
    sort?: 'asc' | 'desc'
}

export interface IReviewQuery extends IBaseQuery{
    [key: string]: unknown
    rating?: number
    sortBy?: string,
    sort?: 'asc' | 'desc'
}

export interface IFoodAndDrinkCommentQuery extends IBaseQuery{
    [key: string]: unknown
    sortBy?: string,
    sort?: 'asc' | 'desc'
}

export interface IUserCommentQuery extends IBaseQuery{
    [key: string]: unknown,
    text?: string
}

export interface INewsQuery extends IBaseQuery{
    [key: string]: unknown,
    title?: string,
    category?: NewsCategoryEnum
}



