import {Metadata} from "next";
import {
  getAccessCookie,
  getUserFromHeaders,
} from "@/src/services/server.service";
import {userService} from "@/src/services/users.service";
import MyFoodAndDrinkView from "@/src/components/views/account/food-and-drink/MyFoodAndDrinkView";

export const metadata: Metadata = {
    title: 'Мій заклад'
}

const FoodAndDrinkPage = async () => {
    const { ownerOf } = await getUserFromHeaders();
    if(!ownerOf){
        return <div>Ви не володієте жодним закладом.</div>
    }
    const accessToken = await getAccessCookie()
    const foodAndDrink = await userService.findMyFoodAndDrink({headers: {'cookie': accessToken}})
    if(!foodAndDrink.success) return <div>{foodAndDrink.data.message}</div>
    return <MyFoodAndDrinkView foodAndDrink={foodAndDrink.data}/>
}

export default FoodAndDrinkPage