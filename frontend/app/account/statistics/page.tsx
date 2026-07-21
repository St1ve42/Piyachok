import {Metadata} from "next";
import StatisticsView from "@/src/components/views/account/food-and-drink/StatisticsView";
import {
  getUserFromHeaders,
} from "@/src/services/server.service";

export const metadata: Metadata = {
    title: 'Статистика мого закладу'
}


const StatisticsPage = async () => {
    const { ownerOf } = await getUserFromHeaders();
    if(!ownerOf){
        return <div>Статистика доступна лише для власників закладів.</div>
    }
    return <StatisticsView id={ownerOf.id}/>
}

export default StatisticsPage