import {useQuery} from "@tanstack/react-query";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";

export function useFoodAndDrinkTotalStatistics(id: string) {
    return useQuery({
        queryKey: ['total statistics', id],
        queryFn: async () => await foodAndDrinkService.findTotalStatistics(id),
    })
}