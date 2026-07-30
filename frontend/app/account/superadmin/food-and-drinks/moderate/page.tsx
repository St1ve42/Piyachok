import type {Metadata} from "next";
import {getAccessCookie} from "@/src/services/server.service";
import {superadminFoodAndDrinkService} from "@/src/services/superadmin-food-and-drink.service";
import FoodAndDrinksModerationView from "@/src/components/views/superadmin/FoodAndDrinksModerationView";
import {FC} from "react";
import {FoodAndDrinkStatusEnum} from "@/src/enums/food-and-drink/food-and-drink-status.enum";
import {redirect} from "next/navigation";
import {queryFoodAndDrinkValidator} from "@/src/validators/food-and-drink/query-food-and-drink.validator";
import {ValidationError} from "joi";
import {FoodAndDrinkSearchParamsType} from "@/src/components/views/HomeView";

export const metadata: Metadata = {
    title: 'Модерація закладів'
};

type PropsType = {
    searchParams: Promise<Record<'status' | 'page' | 'name' | 'limit', string | undefined>>
}

const FoodAndDrinkModeratePage: FC<PropsType> = async ({searchParams}) => {
    const awaitedSearchParams = await searchParams
    const {error, value}: {error?: ValidationError, value: FoodAndDrinkSearchParamsType & {limit: number}} = queryFoodAndDrinkValidator.validate(awaitedSearchParams)
    if(error){
        redirect('/')
    }
    const {page, limit, name, sortBy, sort} = value
    const accessCookie = await getAccessCookie()
    const response = await superadminFoodAndDrinkService.find({limit, page, status: FoodAndDrinkStatusEnum.PENDING, name}, {headers: {'Cookie': accessCookie}})
    if(!response.success){
        return <div>{response.data.message}</div>
    }
    return <FoodAndDrinksModerationView foodAndDrinkListData={response.data} page={page} accessCookie={accessCookie} limit={limit} initialSortByValue={sortBy} initialSortValue={sort} initialSearchValue={name}/>
}

export default FoodAndDrinkModeratePage;