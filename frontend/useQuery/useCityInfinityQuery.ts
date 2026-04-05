import {useInfiniteQuery} from "@tanstack/react-query";
import {regionCityService} from "@/services/region-city.service";
export function useCityInfinityQuery({regionId, search}: {regionId: number, search: string}){
    return useInfiniteQuery({
        queryKey: ['cities', regionId, search],
        queryFn: async ({pageParam = 1}) => await regionCityService.findCitiesByRegionId(regionId, {limit: 5, page: pageParam, search}),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if(lastPage.data.length !== 0){
                return lastPage.page + 1
            }
        },
        enabled: !!regionId
    })
}
