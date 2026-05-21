import {useQuery} from "@tanstack/react-query";
import {regionCityService} from "@/src/services/region-city.service";
export function useCityQuery({regionId = 0, search}: {regionId?: number, search: string}){
    return useQuery({
        queryKey: ['cities', regionId, search],
        queryFn: async () => await regionCityService.findCitiesByRegionId(regionId, {limit: 20, search}),
        enabled: !!regionId
    })
}