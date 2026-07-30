import {IBaseQuery} from "@/src/interfaces/shared/IBaseQuery";
import {fetchApi20} from "@/src/lib/fetch.api.2.0";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {ITopCategoryFullData} from "@/src/interfaces/top-category/ITopCategoryFullData";
import {ICreateTopCategory} from "@/src/interfaces/top-category/ICreateTopCategory";
import {ITopCategory} from "@/src/interfaces/top-category/ITopCategory";
import {IManageFoodAndDrink} from "@/src/interfaces/top-category/IManageFoodAndDrink";
import {IFoodAndDrinksByCategoryFullData} from "@/src/interfaces/food-and-drink/IFoodAndDrinksByCategoryFullData";

class TopCategoryService {
    private prefix: string = '/superadmin/top-categories/'

    async find(accessCookie: string, query?: IBaseQuery): Promise<IApiResponse<ITopCategoryFullData>> {
        const endpoint = this.prefix
        const baseRequestOptions: RequestInit = {next: {revalidate: 30*60, tags: ['all-top-categories']}}
        return await fetchApi20(endpoint, baseRequestOptions, {query, accessCookie})
    }

    async create(body: ICreateTopCategory): Promise<IApiResponse<ITopCategory>> {
        const endpoint = this.prefix
        const baseRequestOptions: RequestInit = {method: 'POST', body: JSON.stringify(body)}
        return await fetchApi20(endpoint, baseRequestOptions)
    }

    async update(id: string, body: Partial<ICreateTopCategory>): Promise<IApiResponse<ITopCategory>> {
        const endpoint = this.prefix + `${id}`;
        const baseRequestOptions: RequestInit = {method: 'PATCH', body: JSON.stringify(body)}
        return await fetchApi20(endpoint, baseRequestOptions)
    }

    async delete(id: string): Promise<IApiResponse<ITopCategory>> {
        const endpoint = this.prefix + `${id}`;
        const baseRequestOptions: RequestInit = {method: 'DELETE'}
        return await fetchApi20(endpoint, baseRequestOptions)
    }

    async findFoodAndDrinks(categoryId: string, accessCookie: string, query?: IBaseQuery): Promise<IApiResponse<IFoodAndDrinksByCategoryFullData>> {
        const endpoint = this.prefix + `${categoryId}/food-and-drinks`;
        const baseRequestOptions: RequestInit = {next: {revalidate: 15, tags: [`all-food-and-drinks-by-category-${categoryId}`]}}
        return await fetchApi20(endpoint, baseRequestOptions, {query, accessCookie})
    }

    async addFoodAndDrink(categoryId: string, body: IManageFoodAndDrink): Promise<IApiResponse> {
        const endpoint = this.prefix + `${categoryId}/add-food-and-drink`;
        const baseRequestOptions: RequestInit = {method: 'POST', body: JSON.stringify(body)}
        return await fetchApi20(endpoint, baseRequestOptions)
    }

    async removeFoodAndDrink(categoryId: string, body: IManageFoodAndDrink): Promise<IApiResponse> {
        const endpoint = this.prefix + `${categoryId}/remove-food-and-drink`;
        const baseRequestOptions: RequestInit = {method: 'POST', body: JSON.stringify(body)}
        return await fetchApi20(endpoint, baseRequestOptions)
    }
}

export const topCategoryService = new TopCategoryService()