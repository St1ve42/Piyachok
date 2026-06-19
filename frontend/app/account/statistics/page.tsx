import {Metadata} from "next";
import Statistics from "@/src/components/features/account/statistics/Statistics";
import {FC} from "react";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import {userService} from "@/src/services/users.service";
import {getAccessCookie} from "@/src/services/server.service";

export const metadata: Metadata = {
    title: 'Статистика мого закладу'
}

type PropsType = {
    searchParams: Promise<Record<'start' | 'end', string | undefined>>
}

const StatisticsPage: FC<PropsType> = async ({searchParams}) => {
    const {start, end} = await searchParams
    const accessCookie = await getAccessCookie()
    const requestInit: RequestInit = {headers: {'Cookie': accessCookie}}
    const foodAndDrinkResponse = await userService.findMyFoodAndDrink(requestInit)
    if(!foodAndDrinkResponse.success){
        return <div>{foodAndDrinkResponse.data.message}</div>
    }
    const foodAndDrinkViewStatisticsResponse = await foodAndDrinkService.findViewStatistics(foodAndDrinkResponse.data.id, {start, end}, requestInit)
    if(!foodAndDrinkViewStatisticsResponse.success){
        return <div>{foodAndDrinkViewStatisticsResponse.data.message}</div>
    }
    return <Statistics start={start} end={end} foodAndDrinkViews={foodAndDrinkViewStatisticsResponse.data}/>
}

export default StatisticsPage