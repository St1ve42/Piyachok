import {IBaseQuery} from "@/interfaces/IBaseQuery";
import {IRegionData} from "@/interfaces/IRegionData";
import {ICityData} from "@/interfaces/ICityData";
import {axiosInstance} from "@/constants/axios.instance.constant";

export class RegionCityService {
    async find(query?: IBaseQuery): Promise<IRegionData>{
        let endpoint = '/regions'
        if(query){
            const {page = 1, skip = 0, limit = 10, search = ''} = query
            endpoint += `?page=${page}&skip=${skip}&limit=${limit}&search=${search}`
        }
        return axiosInstance.get<IRegionData>(endpoint).then(({data}) => data)
    }

    async findCitiesByRegionId(id: number, query?: IBaseQuery): Promise<ICityData>{
        let endpoint = `/regions/${id}/cities`
        if(query){
            const {page = 1, skip = 0, limit = 10, search = ''} = query
            endpoint += `?page=${page}&skip=${skip}&limit=${limit}&search=${search}`
        }
        return axiosInstance.get<ICityData>(endpoint).then(({data}) => data)
    }
}

export const regionCityService = new RegionCityService()