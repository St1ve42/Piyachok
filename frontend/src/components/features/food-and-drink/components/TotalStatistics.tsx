'use client'

import {useFoodAndDrinkTotalStatistics} from "@/src/hooks/tanstack-query/useFoodAndDrinkTotalStatistics";
import {FC} from "react";
import {Eye} from "@gravity-ui/icons"
import Favourite from "@/src/components/features/food-and-drink/components/Favourite";

type PropsType = {
    foodAndDrinkId: string,
    isFavourite: boolean | null
}

const TotalStatistics: FC<PropsType> = ({foodAndDrinkId, isFavourite}) => {
    const { isLoading, data } = useFoodAndDrinkTotalStatistics(foodAndDrinkId);
    if(isLoading){
        return <div>Завантаження...</div>
    }
    if(data){
        if(!data.success){
            return <Favourite isFavourite={isFavourite} foodAndDrinkId={foodAndDrinkId}/>
        }
        else{
            const {totalFavourites, totalViews} = data.data
            return <div className="flex items-center gap-3">
                <div className="flex items-center gap-3"><Eye/> {totalViews}</div>
                <div className="flex items-center gap-3"><Favourite isFavourite={isFavourite} foodAndDrinkId={foodAndDrinkId}/> {totalFavourites}</div>
            </div>
        }
    }
};

export default TotalStatistics;
