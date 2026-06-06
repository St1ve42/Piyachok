import {fetchApi} from "@/src/lib/fetch.api";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {getErrorResponse} from "@/src/errors/get.error.response";

type GetCoordinatesDto = Record<'region' | 'city', string> & {street?: string}
type ICoordinates = Record<'lat' | 'lng', number>

class UtilsService{
    async getCoordinates(body: GetCoordinatesDto, requestInit?: RequestInit): Promise<IApiResponse<ICoordinates>>{
        try{
            const endpoint = '/utils/coordinates'
            const response = await fetchApi<ICoordinates>(endpoint, {method: 'POST', body: JSON.stringify(body) , ...requestInit})
            return {success: true, ...response}
        }
        catch(e){
            console.log("Сталась помилка: ",e)
            return getErrorResponse(e)
        }
    }
}

export const utils = new UtilsService()