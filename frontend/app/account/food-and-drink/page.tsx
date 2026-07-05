import {Metadata} from "next";
import FoodAndDrink from "@/src/components/features/food-and-drink/food-and-drink-info/FoodAndDrink";
import {getAccessCookie} from "@/src/services/server.service";
import {userService} from "@/src/services/users.service";

export const metadata: Metadata = {
    title: 'Мій заклад'
}

const FoodAndDrinkPage = async () => {
    const accessToken = await getAccessCookie()
    const foodAndDrink = await userService.findMyFoodAndDrink({headers: {'cookie': accessToken}})
    if(!foodAndDrink.success) return <div>{foodAndDrink.data.message}</div>
    return <FoodAndDrink foodAndDrink={foodAndDrink.data} mode={'owner'}/>
}

export default FoodAndDrinkPage