import {Metadata} from "next";
import {getAccessCookie} from "@/src/services/server.service";
import {userService} from "@/src/services/users.service";
import MyFoodAndDrink from "@/src/components/views/account/MyFoodAndDrink";

export const metadata: Metadata = {
    title: 'Мій заклад'
}

const FoodAndDrinkPage = async () => {
    const accessToken = await getAccessCookie()
    const foodAndDrink = await userService.findMyFoodAndDrink({headers: {'cookie': accessToken}})
    if(!foodAndDrink.success) return <div>{foodAndDrink.data.message}</div>
    return <MyFoodAndDrink foodAndDrink={foodAndDrink.data}/>
}

export default FoodAndDrinkPage