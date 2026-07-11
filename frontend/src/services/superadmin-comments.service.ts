import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {fetchApi20} from "@/src/lib/fetch.api.2.0";
import {IQueryComments} from "@/src/validators/comments/query-comments.validator";
import {ICommentWithUserAndFoodAndDrinkListData} from "@/src/interfaces/comments/ICommentWithUserAndFoodAndDrinkListData";

class SuperadminCommentsService {
    async find(query?: IQueryComments, accessCookie?: string): Promise<IApiResponse<ICommentWithUserAndFoodAndDrinkListData>>{
        const endpoint = '/superadmin/comments';
        const baseHeaders: RequestInit = {next: {revalidate: 15, tags: ['all-comments']}}
        return await fetchApi20<ICommentWithUserAndFoodAndDrinkListData>(endpoint, baseHeaders, {query, accessCookie})
    }
}

export const superadminCommentsService = new SuperadminCommentsService()

