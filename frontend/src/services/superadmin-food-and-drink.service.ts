import {IFoodAndDrinkQuery} from "@/src/interfaces/shared/IBaseQuery";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IFoodAndDrinkFullData} from "@/src/interfaces/food-and-drink/IFoodAndDrinkFullData";
import {QueryDirector} from "@/src/lib/query.director";
import {fetchApi} from "@/src/lib/fetch.api";
import {getErrorResponse} from "@/src/errors/get.error.response";
import {FoodAndDrinkStatusEnum} from "@/src/enums/food-and-drink/food-and-drink-status.enum";
import { IFoodAndDrinkBindOwnership } from "@/src/interfaces/food-and-drink/IFoodAndDrinkBindOwnership";
import {IFoodAndDrinkSuperadminInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkSuperadminInfo";
import {ISuperadminFoodAndDrinkUpdate} from "@/src/interfaces/food-and-drink/ISuperadminFoodAndDrinkUpdate";

export class SuperadminFoodAndDrinkService {
    async find(query?: IFoodAndDrinkQuery, requestInit?: RequestInit):Promise<IApiResponse<IFoodAndDrinkFullData>> {
        try{
            const endpoint = '/superadmin/food-and-drinks';
            const queryDirector = new QueryDirector(endpoint, query);
            const fullEndpoint = queryDirector.build();
            const foodAndDrinkList = await fetchApi<IFoodAndDrinkFullData>(fullEndpoint, {cache: 'no-store', ...requestInit})
            return {success: true, ...foodAndDrinkList}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.find.name}:`, e)
            return getErrorResponse(e)
        }
    }

    async update(id: string, body: Partial<ISuperadminFoodAndDrinkUpdate>):Promise<IApiResponse> {
        try{
            const endpoint = `/superadmin/food-and-drinks/${id}`;
            const foodAndDrinkBindOwnershipResponse = await fetchApi(endpoint, {method: 'PATCH', body: JSON.stringify(body)})
            return {success: true, ...foodAndDrinkBindOwnershipResponse}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.find.name}:`, e)
            return getErrorResponse(e)
        }
    }

    async setStatus(id: string, status: FoodAndDrinkStatusEnum, requestInit?: RequestInit):Promise<IApiResponse> {
        try{
            const endpoint = `/superadmin/food-and-drinks/${id}/status`;
            const foodAndDrinkList = await fetchApi(endpoint, {method: 'POST', body: JSON.stringify({status}), ...requestInit})
            return {success: true, ...foodAndDrinkList}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.find.name}:`, e)
            return getErrorResponse(e)
        }
    }

    async findById(id: string, requestInit?: RequestInit):Promise<IApiResponse<IFoodAndDrinkSuperadminInfo>> {
        try{
            const endpoint = `/superadmin/food-and-drinks/${id}`;
            const foodAndDrinkByIdResponse = await fetchApi<IFoodAndDrinkSuperadminInfo>(endpoint, {method: 'GET', ...requestInit})
            return {success: true, ...foodAndDrinkByIdResponse}
        }
        catch (e){
            console.log(`Сталась помилка в ${this.find.name}:`, e)
            return getErrorResponse(e)
        }
    }

    async bindOwnership(id: string, body: IFoodAndDrinkBindOwnership, requestInit?: RequestInit):Promise<IApiResponse> {
      try{
        const endpoint = `/superadmin/food-and-drinks/${id}/bind-ownership`;
        const foodAndDrinkBindOwnershipResponse = await fetchApi(endpoint, {method: 'POST', body: JSON.stringify(body), ...requestInit})
        return {success: true, ...foodAndDrinkBindOwnershipResponse}
      }
      catch (e){
        console.log(`Сталась помилка в ${this.find.name}:`, e)
        return getErrorResponse(e)
      }
    }
}

export const superadminFoodAndDrinkService = new SuperadminFoodAndDrinkService()