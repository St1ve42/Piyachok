import {IBaseQuery} from "@/src/interfaces/shared/IBaseQuery";
import {IFullData} from "@/src/interfaces/shared/IFullData";
import {IPiyachokList} from "@/src/interfaces/piyachok/IPiyachokList";
import {fetchApi20} from "@/src/lib/fetch.api.2.0";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IPiyachokDetail} from "@/src/interfaces/piyachok/IPiyachokDetail";
import {IPiyachokReplyList} from "@/src/interfaces/piyachok-reply/IPiyachokReplyList";
import {IPiyachokCreate} from "@/src/interfaces/piyachok/IPiyachokCreate";

export class PiyachokService {
    async find(query?: IBaseQuery): Promise<IApiResponse<IFullData<IPiyachokList>>> {
        const endpoint = `/piyachok`;
        const baseRequestOptions: RequestInit = {next: {revalidate: 3*60, tags: ['piyachoks']}}
        return await fetchApi20<IFullData<IPiyachokList>>(endpoint, baseRequestOptions, {query})
    }

    async findById(id: string): Promise<IApiResponse<IPiyachokDetail>> {
        const endpoint = `/piyachok/${id}`;
        const baseRequestOptions: RequestInit = {next: {revalidate: 3*60, tags: [`piyachok-${id}`]}}
        return await fetchApi20<IPiyachokDetail>(endpoint, baseRequestOptions)
    }

    async create(body: IPiyachokCreate): Promise<IApiResponse> {
        const endpoint = `/piyachok`;
        const baseRequestOptions: RequestInit = {method: 'POST', body: JSON.stringify(body)}
        return await fetchApi20(endpoint, baseRequestOptions)
    }

    async update(id: string, body: Partial<IPiyachokCreate>): Promise<IApiResponse> {
        const endpoint = `/piyachok/${id}`;
        const baseRequestOptions: RequestInit = {method: 'PATCH', body: JSON.stringify(body)}
        return await fetchApi20(endpoint, baseRequestOptions)
    }

    async delete(id: string): Promise<IApiResponse> {
        const endpoint = `/piyachok/${id}`;
        const baseRequestOptions: RequestInit = {method: 'DELETE'}
        return await fetchApi20(endpoint, baseRequestOptions)
    }

    async findReplies(id: string, query?: IBaseQuery): Promise<IApiResponse<IFullData<IPiyachokReplyList>>> {
        const endpoint = `/piyachok/${id}/replies`;
        const baseRequestOptions: RequestInit = {next: {revalidate: 15, tags: [`piyachok-replies-${id}`]}}
        return await fetchApi20<IFullData<IPiyachokReplyList>>(endpoint, baseRequestOptions, {query})
    }
}

export const piyachokService = new PiyachokService()