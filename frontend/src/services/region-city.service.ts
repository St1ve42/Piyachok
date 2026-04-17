import {IBaseQuery} from "@/src/interfaces/shared/IBaseQuery";
import {IRegionData} from "@/src/interfaces/region-city/IRegionData";
import {ICityData} from "@/src/interfaces/region-city/ICityData";
import {fetchApi} from "@/src/lib/fetch.api";

export class RegionCityService {
    async find(query?: IBaseQuery): Promise<IRegionData>{
        let endpoint = '/regions'
        if(query){
            const {page = 1, skip = 0, limit = 10, search = ''} = query
            endpoint += `?page=${page}&skip=${skip}&limit=${limit}&search=${search}`
        }
        return await fetchApi<IRegionData>(endpoint).then(({data}) => data)
    }

    async findCitiesByRegionId(id: number = 1, query?: IBaseQuery): Promise<ICityData>{
        let endpoint = `/regions/${id}/cities`
        if(query){
            const {page = 1, skip = 0, limit = 10, search = ''} = query
            endpoint += `?page=${page}&skip=${skip}&limit=${limit}&search=${search}`
        }
        return await fetchApi<ICityData>(endpoint).then(({data}) => data)
    }
}

export const regionCityService = new RegionCityService()