import {INewsQuery} from "@/src/interfaces/shared/IBaseQuery";
import {fetchApi20} from "@/src/lib/fetch.api.2.0";
import {IGeneralNewsListData} from "@/src/interfaces/news/IGeneralNewsListData";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IGeneralNewsById} from "@/src/interfaces/news/IGeneralNewsById";
import {INewsCreate} from "@/src/interfaces/news/INewsCreate";

export class NewsService {
    async find(query?: INewsQuery): Promise<IApiResponse<IGeneralNewsListData>> {
        const endpoint = `/news`;
        const baseRequestOptions: RequestInit = {}
        return await fetchApi20<IGeneralNewsListData>(endpoint, baseRequestOptions, {query})
    }

    async findById(id: string): Promise<IApiResponse<IGeneralNewsById>> {
        const endpoint = `/news/${id}`;
        const baseRequestOptions: RequestInit = {}
        return await fetchApi20<IGeneralNewsById>(endpoint, baseRequestOptions)
    }

    async create(body: INewsCreate): Promise<IApiResponse<IGeneralNewsById>> {
        const endpoint = `/news`;
        const baseRequestOptions: RequestInit = {method: 'POST', body: JSON.stringify(body)}
        return await fetchApi20<IGeneralNewsById>(endpoint, baseRequestOptions)
    }

    async uploadPhoto(id: string, formData: FormData): Promise<IApiResponse> {
        const endpoint = `/news/${id}/photo`;
        const baseRequestOptions: RequestInit = {method: 'POST', body: formData}
        return await fetchApi20(endpoint, baseRequestOptions)
    }

    async deletePhoto(id: string): Promise<IApiResponse> {
        const endpoint = `/news/${id}/photo`;
        const baseRequestOptions: RequestInit = {method: 'DELETE'}
        return await fetchApi20(endpoint, baseRequestOptions)
    }

    async delete(id: string): Promise<IApiResponse> {
        const endpoint = `/news/${id}`;
        const baseRequestOptions: RequestInit = {method: 'DELETE'}
        return await fetchApi20(endpoint, baseRequestOptions)
    }

    async update(id: string, body: Partial<INewsCreate>): Promise<IApiResponse> {
        const endpoint = `/news/${id}`;
        const baseRequestOptions: RequestInit = {method: 'PATCH', body: JSON.stringify(body)}
        return await fetchApi20(endpoint, baseRequestOptions)
    }
}

export const newsService = new NewsService()