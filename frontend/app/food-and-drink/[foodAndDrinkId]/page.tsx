import type {Metadata} from "next";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import {notFound} from "next/navigation";
import FoodAndDrinkByID from "@/src/components/features/food-and-drink-by-id/FoodAndDrinkByID";
import {cookies} from "next/headers";
import {IFoodAndDrinkById} from "@/src/interfaces/food-and-drink/IFoodAndDrinkById";

type Props = {
    params: Promise<Record<'foodAndDrinkId', string | undefined>>,
    searchParams: Promise<unknown>
}

export const getFoodAndDrinkById = async ({params}: Props): Promise<IFoodAndDrinkById> => {
    const {foodAndDrinkId} = await params
    if(!foodAndDrinkId){
        notFound()
    }
    const cookieStore = await cookies()
    const accessTokenCookie = cookieStore.get('accessToken')
    const requestInit: RequestInit | undefined = accessTokenCookie ? {headers: {'Cookie': `${accessTokenCookie.name}=${accessTokenCookie.value}`}} : undefined
    const foodAndDrinkResponse = await foodAndDrinkService.findById(foodAndDrinkId, requestInit)
    if(!foodAndDrinkResponse.success){
        notFound()
    }
    return foodAndDrinkResponse.data
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const foodAndDrink = await getFoodAndDrinkById(props)
    return {
        title: foodAndDrink.name
    }
};


const FoodAndDrinkByIdPage = async (props: Props) => {
    const foodAndDrink = await getFoodAndDrinkById(props)
    return <FoodAndDrinkByID foodAndDrink={foodAndDrink}/>

}

export default FoodAndDrinkByIdPage;