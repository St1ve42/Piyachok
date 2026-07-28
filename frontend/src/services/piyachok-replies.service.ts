import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {fetchApi20} from "@/src/lib/fetch.api.2.0";
import {IPiyachokReplyCreate} from "@/src/interfaces/piyachok-reply/IPiyachokReplyCreate";

export class PiyachokRepliesService {
    private baseUrl = '/piyachok-replies'

    async create(body: IPiyachokReplyCreate): Promise<IApiResponse> {
        const endpoint = this.baseUrl;
        const baseRequestOptions: RequestInit = {method: 'POST', body: JSON.stringify(body)}
        return await fetchApi20(endpoint, baseRequestOptions)
    }

    async update(id: string, body: Partial<IPiyachokReplyCreate>): Promise<IApiResponse> {
        const endpoint = this.baseUrl + '/' + id;
        const baseRequestOptions: RequestInit = {method: 'PATCH', body: JSON.stringify(body)}
        return await fetchApi20(endpoint, baseRequestOptions)
    }

    async delete(id: string): Promise<IApiResponse> {
        const endpoint = this.baseUrl + '/' + id;
        const baseRequestOptions: RequestInit = {method: 'DELETE'}
        return await fetchApi20(endpoint, baseRequestOptions)
    }
}

export const piyachokRepliesService = new PiyachokRepliesService()