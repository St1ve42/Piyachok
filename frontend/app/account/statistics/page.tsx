import {Metadata} from "next";
import Statistics from "@/src/components/views/account/Statistics";
import {FC} from "react";
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
    return <Statistics start={start} end={end} id={foodAndDrinkResponse.data.id}/>
}

export default StatisticsPage