import type {Metadata} from "next";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import {notFound} from "next/navigation";
import FoodAndDrink from "@/src/components/features/account/food-and-drink/FoodAndDrink";
import {IFoodAndDrink} from "@/src/interfaces/food-and-drink/IFoodAndDrink";

type Props = {
    params: Promise<Record<'foodAndDrinkId', string | undefined>>,
    searchParams: Promise<unknown>
}

export const getFoodAndDrinkById = async ({params}: Props): Promise<IFoodAndDrink> => {
    const {foodAndDrinkId} = await params
    if(!foodAndDrinkId){
        notFound()
    }
    const foodAndDrinkResponse = await foodAndDrinkService.findById(foodAndDrinkId)
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
    return <div className="flex justify-center">
        <div className="w-[80%]">
            <FoodAndDrink foodAndDrink={foodAndDrink} isPublic/>
        </div>
    </div>

}

export default FoodAndDrinkByIdPage;