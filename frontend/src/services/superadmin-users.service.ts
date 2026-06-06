import {IUsersQuery} from "@/src/interfaces/shared/IBaseQuery";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {QueryDirector} from "@/src/lib/query.director";
import {fetchApi} from "@/src/lib/fetch.api";
import {getErrorResponse} from "@/src/errors/get.error.response";
import {IUserListData} from "@/src/interfaces/users/IUserListData";
import {IUser} from "@/src/interfaces/users/IUser";
import { IUpdateUser } from '@/src/interfaces/users/IUpdateUser';

class SuperadminUsersService {
    async find(query?: IUsersQuery, requestInit?: RequestInit): Promise<IApiResponse<IUserListData>> {
        try{
            const endpoint = '/superadmin/users';
            const queryDirector = new QueryDirector(endpoint, query);
            const fullEndpoint = queryDirector.build();
            const foodAndDrinkList = await fetchApi<IUserListData>(fullEndpoint, {cache: 'no-store', ...requestInit})
            return {success: true, ...foodAndDrinkList}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async findById(id:string, requestInit?: RequestInit): Promise<IApiResponse<IUser>> {
        try{
            const endpoint = `/superadmin/users/${id}`;
            const foodAndDrinkList = await fetchApi<IUser>(endpoint, {cache: 'no-store', ...requestInit})
            return {success: true, ...foodAndDrinkList}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async update(id: string, body: IUpdateUser, requestInit?: RequestInit): Promise<IApiResponse> {
        try{
            const endpoint = `/superadmin/users/${id}`;
            const foodAndDrinkList = await fetchApi(endpoint, {cache: 'no-store', method: 'PATCH', body: JSON.stringify(body),...requestInit})
            return {success: true, ...foodAndDrinkList}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async delete(id: string, requestInit?: RequestInit): Promise<IApiResponse> {
        try{
            const endpoint = `/superadmin/users/${id}`;
            const foodAndDrinkList = await fetchApi(endpoint, {cache: 'no-store', method: 'DELETE', ...requestInit})
            return {success: true, ...foodAndDrinkList}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async uploadPhoto(id: string, body: FormData, requestInit?: RequestInit): Promise<IApiResponse> {
        try{
            const endpoint = `/superadmin/users/${id}/photo`;
            const foodAndDrinkList = await fetchApi(endpoint, {cache: 'no-store', method: 'POST', body, ...requestInit})
            return {success: true, ...foodAndDrinkList}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

    async deletePhoto(id: string, requestInit?: RequestInit): Promise<IApiResponse> {
        try{
            const endpoint = `/superadmin/users/${id}/photo`;
            const foodAndDrinkList = await fetchApi(endpoint, {cache: 'no-store', method: 'DELETE', ...requestInit})
            return {success: true, ...foodAndDrinkList}
        }
        catch (e){
            return getErrorResponse(e)
        }
    }

}

export const superadminUsersService = new SuperadminUsersService()