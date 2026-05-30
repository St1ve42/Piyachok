import type {Metadata} from "next";
import {getAccessCookie} from "@/src/services/server.service";
import {protectedFoodAndDrinkService} from "@/src/services/protected-food-and-drink.service";
import FoodAndDrinkModerate from "@/src/components/features/account/food-and-drink-moderate/FoodAndDrinkModerate";
import {FC} from "react";
import {FoodAndDrinkStatusEnum} from "@/src/enums/food-and-drink/food-and-drink-status.enum";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
    title: 'Модерація закладів'
};

type PropsType = {
    searchParams: Promise<Record<'status' | 'page' | 'name', string | undefined>>
}

const FoodAndDrinkModeratePage: FC<PropsType> = async ({searchParams}) => {
    const {page = 1, name} = await searchParams
    if(Number(page) < 1){
        redirect('/account/superadmin/food-and-drinks/moderate')
    }
    const accessCookie = await getAccessCookie()
    const response = await protectedFoodAndDrinkService.find({limit: 20, status: FoodAndDrinkStatusEnum.PENDING, name}, {headers: {'Cookie': accessCookie}})
    if(!response.success){
        return <div>{response.data.message}</div>
    }
    return <FoodAndDrinkModerate foodAndDrinkListData={response.data} page={Number(page)}/>
}

export default FoodAndDrinkModeratePage;