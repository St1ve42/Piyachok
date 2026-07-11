import type {Metadata} from "next";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import { notFound, redirect } from "next/navigation";
import FoodAndDrinkByID from "@/src/components/views/FoodAndDrinkByID";
import {cookies} from "next/headers";
import {IFoodAndDrinkById} from "@/src/interfaces/food-and-drink/IFoodAndDrinkById";
import {ReviewSortByEnum} from "@/src/enums/ReviewSortByEnum";
import {SortEnum} from "@/src/enums/shared/SortEnum";
import {queryReviewValidator} from "@/src/validators/review/query-review.validator";

type Props = {
    params: Promise<Record<'foodAndDrinkId', string | undefined>>,
    searchParams: Promise<Record<'rating', string | undefined> & {sortBy?: ReviewSortByEnum, sort?: SortEnum}>
}

export const getFoodAndDrinkById = async ({params}: Props): Promise<{foodAndDrink: IFoodAndDrinkById, id: string}> => {
    const {foodAndDrinkId} = await params
    if(!foodAndDrinkId){
        notFound()
    }
    const cookieStore = await cookies()
    const accessTokenCookie = cookieStore.get('accessToken')
    const accessToken = accessTokenCookie ? `${accessTokenCookie.name}=${accessTokenCookie.value}` : undefined
    const foodAndDrinkResponse = await foodAndDrinkService.findById(foodAndDrinkId, accessToken)
    if(!foodAndDrinkResponse.success){
        notFound()
    }
    return {foodAndDrink: foodAndDrinkResponse.data, id: foodAndDrinkId}
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const { foodAndDrink } = await getFoodAndDrinkById(props);
    return {
        title: foodAndDrink.name
    }
};


const FoodAndDrinkByIdPage = async (props: Props) => {
    const { foodAndDrink, id } = await getFoodAndDrinkById(props);
    const awaitedSearchParams = await props.searchParams
    const {error, value} = queryReviewValidator.validate(awaitedSearchParams)
    if(error){
        redirect(`/food-and-drink/${id}`)
    }
    return <FoodAndDrinkByID foodAndDrink={foodAndDrink} searchParams={value}/>

}

export default FoodAndDrinkByIdPage;