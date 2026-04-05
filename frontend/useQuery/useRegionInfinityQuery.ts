import {useInfiniteQuery} from "@tanstack/react-query";
import {regionCityService} from "@/services/region-city.service";
export function useRegionInfinityQuery({search}: {search: string}){
    return useInfiniteQuery({
        queryKey: ['regions', search],
        queryFn: async ({pageParam = 1}) => await regionCityService.find({limit: 3, page: pageParam, search}),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if(lastPage.data.length !== 0){
                return lastPage.page + 1
            }
        },
    })
}
