import {IRegionCityQuery} from "@/src/interfaces/shared/IBaseQuery";
import {IRegionData} from "@/src/interfaces/region-city/IRegionData";
import {ICityData} from "@/src/interfaces/region-city/ICityData";
import {fetchApi} from "@/src/lib/fetch.api";
import {QueryDirector} from "@/src/lib/query.director";

export class RegionCityService {
    async find(query?: IRegionCityQuery): Promise<IRegionData>{
        const endpoint = `/regions`
        const queryDirector = new QueryDirector(endpoint, query);
        const fullEndpoint = queryDirector.build();
        return await fetchApi<IRegionData>(fullEndpoint).then(({data}) => data)
    }

    async findCitiesByRegionId(id: number = 1, query?: IRegionCityQuery): Promise<ICityData>{
        const endpoint = `/regions/${id}/cities`
        const queryDirector = new QueryDirector(endpoint, query);
        const fullEndpoint = queryDirector.build();
        return await fetchApi<ICityData>(fullEndpoint).then(({data}) => data)
    }
}

export const regionCityService = new RegionCityService()