import type {Metadata} from "next";
import {getAccessCookie} from "@/src/services/server.service";
import {superadminFoodAndDrinkService} from "@/src/services/superadmin-food-and-drink.service";
import FoodAndDrinkModerate from "@/src/components/views/superadmin/FoodAndDrinkModerate";
import {FC} from "react";
import {FoodAndDrinkStatusEnum} from "@/src/enums/food-and-drink/food-and-drink-status.enum";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
    title: 'Модерація закладів'
};

type PropsType = {
    searchParams: Promise<Record<'status' | 'page' | 'name' | 'limit', string | undefined>>
}

const FoodAndDrinkModeratePage: FC<PropsType> = async ({searchParams}) => {
    let {page = 1, name, limit = 20} = await searchParams
    page = Number(page)
    limit = Number(limit)
    if(page < 1 || isNaN(page) || limit < 1 || isNaN(limit)){
        redirect('/account/superadmin/food-and-drinks/moderate')
    }
    const accessCookie = await getAccessCookie()
    const response = await superadminFoodAndDrinkService.find({limit, page, status: FoodAndDrinkStatusEnum.PENDING, name}, {headers: {'Cookie': accessCookie}})
    if(!response.success){
        return <div>{response.data.message}</div>
    }
    return <FoodAndDrinkModerate foodAndDrinkListData={response.data} page={page} accessCookie={accessCookie} limit={limit}/>
}

export default FoodAndDrinkModeratePage;