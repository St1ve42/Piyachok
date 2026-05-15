import {useQuery} from "@tanstack/react-query";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";

export function useSearch(name: string){
    return useQuery({
        queryKey: ['search', name],
        queryFn: async () => await foodAndDrinkService.find({limit: 10, name}),
        enabled: !!name
    })
}