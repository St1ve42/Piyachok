import {useInfiniteQuery} from "@tanstack/react-query";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import {IFoodAndDrinkCommentQuery} from "@/src/interfaces/shared/IBaseQuery";

type PropsType = {
    foodAndDrinkId: string,
    query?: IFoodAndDrinkCommentQuery
}

const useCommentInfinityQuery = ({foodAndDrinkId, query}: PropsType) => {
    return useInfiniteQuery({
        queryKey: ['food-and-drink-comments', foodAndDrinkId, query],
        queryFn: async ({pageParam = 1}) => await foodAndDrinkService.findComments(foodAndDrinkId, {...query, page: pageParam}),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const {success, data} = lastPage
            if(success && data.data.length > 0){
                return lastPage.data.page + 1
            }
        },
    })
}

export default useCommentInfinityQuery