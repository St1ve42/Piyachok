import {useQuery} from "@tanstack/react-query";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";

export function useTypesQuery(){
    return useQuery({
        queryKey: ['types'],
        queryFn: async () => await foodAndDrinkService.findTypes(),
    })
}
