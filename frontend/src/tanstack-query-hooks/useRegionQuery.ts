import {useQuery} from "@tanstack/react-query";
import {regionCityService} from "@/src/services/region-city.service";
export function useRegionQuery({search}: {search: string}){
    return useQuery({
        queryKey: ['regions', search],
        queryFn: async () => await regionCityService.find({limit: 3, search}),
        enabled: !!search
    })
}
