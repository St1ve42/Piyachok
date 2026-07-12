import {Metadata} from "next";
import Statistics from "@/src/components/views/account/Statistics";
import {userService} from "@/src/services/users.service";
import {getAccessCookie} from "@/src/services/server.service";

export const metadata: Metadata = {
    title: 'Статистика мого закладу'
}


const StatisticsPage = async () => {
    const accessCookie = await getAccessCookie()
    const requestInit: RequestInit = {headers: {'Cookie': accessCookie}}
    const foodAndDrinkResponse = await userService.findMyFoodAndDrink(requestInit)
    if(!foodAndDrinkResponse.success){
        return <div>{foodAndDrinkResponse.data.message}</div>
    }
    return <Statistics id={foodAndDrinkResponse.data.id}/>
}

export default StatisticsPage