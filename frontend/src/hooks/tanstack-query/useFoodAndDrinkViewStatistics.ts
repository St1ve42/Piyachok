import {useQuery} from "@tanstack/react-query";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import {IFoodAndDrinkViewStatisticsQuery} from "@/src/interfaces/food-and-drink/IFoodAndDrinkViewStatisticsQuery";

export const useFoodAndDrinkViewStatistics = (id: string, query?: IFoodAndDrinkViewStatisticsQuery,) => {
    return useQuery({
        queryKey: ['view statistics', id, query],
        queryFn: async () => await foodAndDrinkService.findViewStatistics(id, query),
    })
}