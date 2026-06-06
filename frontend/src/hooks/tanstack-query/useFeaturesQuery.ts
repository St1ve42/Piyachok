import {useQuery} from "@tanstack/react-query";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";

export function useFeaturesQuery(){
    return useQuery({
        queryKey: ['features'],
        queryFn: async () => await foodAndDrinkService.findFeatures(),
    })
}