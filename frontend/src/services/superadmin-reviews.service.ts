import {IFoodAndDrinkQuery} from "@/src/interfaces/shared/IBaseQuery";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {QueryDirector} from "@/src/lib/query.director";
import {fetchApi} from "@/src/lib/fetch.api";
import {getErrorResponse} from "@/src/errors/get.error.response";
import {IReviewWithCreatorAndFoodAndDrinkListData} from "@/src/interfaces/reviews/IReviewWithCreatorAndFoodAndDrinkListData";

export class SuperadminReviewsService {
    async find(query?: IFoodAndDrinkQuery, requestInit?: RequestInit):Promise<IApiResponse<IReviewWithCreatorAndFoodAndDrinkListData>> {
        try{
            const endpoint = '/superadmin/reviews';
            const queryDirector = new QueryDirector(endpoint, query);
            const fullEndpoint = queryDirector.build();
            const foodAndDrinkList = await fetchApi<IReviewWithCreatorAndFoodAndDrinkListData>(fullEndpoint, {next: {revalidate: 15, tags: ['all-reviews']}, ...requestInit})
            return {success: true, ...foodAndDrinkList}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }
}

export const superadminReviewsService = new SuperadminReviewsService()