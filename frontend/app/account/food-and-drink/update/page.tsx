import type {Metadata} from "next";
import {FC} from "react";
import { getAccessCookie, getUserFromHeaders} from "@/src/services/server.service";
import { userService } from "@/src/services/users.service";
import FoodAndDrinkCreatingOrUpdatingView from "@/src/components/views/account/food-and-drink/create-or-update/FoodAndDrinkCreatingOrUpdatingView";

export const metadata: Metadata = {
    title: 'Оновлення закладу'
};

type Props = {
    params: Promise<unknown>,
    searchParams: Promise<unknown>
}

const UpdateFoodAndDrinkPage: FC<Props> = async () => {
    const { ownerOf } = await getUserFromHeaders();
    if(!ownerOf){
        return <div>Ви не володієте жодним закладом, який можна оновити.</div>
    }
    const accessToken = await getAccessCookie()
    const foodAndDrink = await userService.findMyFoodAndDrink({headers: {'cookie': accessToken}})
    if(!foodAndDrink.success) return <div>{foodAndDrink.data.message}</div>
    return <FoodAndDrinkCreatingOrUpdatingView mode={'update'} foodAndDrink={foodAndDrink.data} urlToRedirect={'/account/food-and-drink'}/>
}

export default UpdateFoodAndDrinkPage;