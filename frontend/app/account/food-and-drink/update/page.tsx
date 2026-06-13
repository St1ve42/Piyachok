import type {Metadata} from "next";
import {FC} from "react";
import { getAccessCookie } from "@/src/services/server.service";
import { userService } from "@/src/services/users.service";
import CreateOrUpdateFoodAndDrink from "@/src/components/features/account/food-and-drink/create/CreateOrUpdateFoodAndDrink";

export const metadata: Metadata = {
    title: 'Оновлення закладу'
};

type Props = {
    params: Promise<unknown>,
    searchParams: Promise<unknown>
}

const UpdateFoodAndDrinkPage: FC<Props> = async () => {
    const accessToken = await getAccessCookie()
    const foodAndDrink = await userService.findMyFoodAndDrink({headers: {'cookie': accessToken}})
    if(!foodAndDrink.success) return <div>{foodAndDrink.data.message}</div>
    return <CreateOrUpdateFoodAndDrink mode={'update'} foodAndDrink={foodAndDrink.data}/>
}

export default UpdateFoodAndDrinkPage;