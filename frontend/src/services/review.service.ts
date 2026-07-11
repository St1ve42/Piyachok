import {ICreateReview} from "@/src/interfaces/reviews/ICreateReview";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {fetchApi} from "@/src/lib/fetch.api";
import {getErrorResponse} from "@/src/errors/get.error.response";
import {IReview} from "@/src/interfaces/reviews/IReview";
import {IReviewComplaint} from "@/src/interfaces/reviews/IReviewComplaint";

class ReviewService {
    async create(createReviewDto: ICreateReview, requestInit?: RequestInit): Promise<IApiResponse<IReview>> {
        try{
            const endpoint = `/reviews`;
            const response = await fetchApi<IReview>(endpoint, {method: 'POST', body: JSON.stringify(createReviewDto), ...requestInit})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async delete(id: string, requestInit?: RequestInit): Promise<IApiResponse<IReview>> {
        try{
            const endpoint = `/reviews/${id}`;
            const response = await fetchApi<IReview>(endpoint, {method: 'DELETE', ...requestInit})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async sendComplaint(id: string, reviewComplaintDto: IReviewComplaint, requestInit?: RequestInit): Promise<IApiResponse> {
        try{
            const endpoint = `/reviews/${id}/complaint`;
            const response = await fetchApi(endpoint, {method: 'POST', body: JSON.stringify(reviewComplaintDto),...requestInit})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }
}

export const reviewService = new ReviewService()