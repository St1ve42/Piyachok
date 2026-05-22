import {useQuery} from "@tanstack/react-query";
import {userService} from "@/src/services/users.service";

export function useMyFoodAndDrink(){
    return useQuery({
        queryKey: ['myFoodAndDrink'],
        queryFn: async () => await userService.findMyFoodAndDrink(),
    })
}