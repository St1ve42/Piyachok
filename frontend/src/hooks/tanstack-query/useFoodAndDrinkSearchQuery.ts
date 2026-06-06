import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import {superadminFoodAndDrinkService} from "@/src/services/superadmin-food-and-drink.service";
import {FoodAndDrinkStatusEnum} from "@/src/enums/food-and-drink/food-and-drink-status.enum";
import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {IFoodAndDrinkListData} from "@/src/interfaces/food-and-drink/IFoodAndDrinkListData";

export function useFoodAndDrinkSearchQuery(name: string, type: 'public'): UseQueryResult<IApiResponse<IFoodAndDrinkListData>, Error>;

export function useFoodAndDrinkSearchQuery(name: string, type: 'moderate' | 'all', accessCookie: string): UseQueryResult<IApiResponse<IFoodAndDrinkListData>, Error>;

export function useFoodAndDrinkSearchQuery<T extends 'public' | 'moderate' | 'all'>(name: string, type: T, accessCookie?: string){
    if ((type === 'moderate' || type === 'all') && !accessCookie) {
        throw new Error("accessCookie is required for 'moderate' or 'all' types");
    }
    return useQuery({
        queryKey: ['search', name, type, accessCookie],
        queryFn: async () => {
            switch (type){
                case "public":
                    return await foodAndDrinkService.find({limit: 10, name})
                case "moderate":
                    return await superadminFoodAndDrinkService.find({limit: 10, name, status: FoodAndDrinkStatusEnum.PENDING}, {headers: {...((accessCookie) ? { 'Cookie': accessCookie } : {})}})
                case "all":
                    return await superadminFoodAndDrinkService.find({limit: 10, name}, {headers: {...((accessCookie) ? { 'Cookie': accessCookie } : {})}})
            }
        },
        enabled: !!name
    })
}