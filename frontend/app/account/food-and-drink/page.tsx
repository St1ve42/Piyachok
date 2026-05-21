import {Metadata} from "next";
import FoodAndDrink from "@/src/components/features/account/food-and-drink/FoodAndDrink";

export const metadata: Metadata = {
    title: 'Мій заклад'
}

const FoodAndDrinkPage = async () => {
    return <FoodAndDrink/>
}

export default FoodAndDrinkPage