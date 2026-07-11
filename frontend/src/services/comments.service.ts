import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {fetchApi} from "@/src/lib/fetch.api";
import {getErrorResponse} from "@/src/errors/get.error.response";
import {IComment} from "@/src/interfaces/comments/IComment";
import {ICreateComment} from "@/src/interfaces/comments/ICreateComment";

export class CommentsService{
    async create(createCommentDto: ICreateComment, requestInit?: RequestInit): Promise<IApiResponse<IComment>> {
        try{
            const endpoint = `/comments`;
            const response = await fetchApi<IComment>(endpoint, {method: 'POST', body: JSON.stringify(createCommentDto), ...requestInit})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async delete(id: string, requestInit?: RequestInit): Promise<IApiResponse> {
        try{
            const endpoint = `/comments/${id}`;
            const response = await fetchApi(endpoint, {method: 'DELETE', ...requestInit})
            return {success: true, ...response}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }
}

export const commentsService = new CommentsService()