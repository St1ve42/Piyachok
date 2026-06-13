import {fetchApi} from "@/src/lib/fetch.api";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {getErrorResponse} from "@/src/errors/get.error.response";

export type GetCoordinatesDto = Record<'region' | 'city', string> & {street?: string}
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

    async urlToFile (url: string, filename: string): Promise<File> {
      const response = await fetch(url);

      const blob = await response.blob();

      return new File([blob], filename);
    }

    buildStorageURL(path: string): string {
      if(!path.includes('http')){
        return process.env.NEXT_PUBLIC_STORAGE_URL + path
      }
      return path
    }

    capitalizeFirstLetter(text: string): string{
      return text[0].toUpperCase() + text.slice(1, text.length)
    }
}

export const utils = new UtilsService()