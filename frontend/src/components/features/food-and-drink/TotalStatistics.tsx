'use client'

import {useFoodAndDrinkTotalStatistics} from "@/src/hooks/tanstack-query/useFoodAndDrinkTotalStatistics";
import {FC} from "react";
import {Eye} from "@gravity-ui/icons"
import Favourite from "@/src/components/features/food-and-drink/Favourite";

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
            return <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4 text-sm">
                <div className="flex items-center gap-2"><Eye/> <span className="font-medium">{totalViews}</span></div>
                <div className="flex items-center gap-2"><Favourite isFavourite={isFavourite} foodAndDrinkId={foodAndDrinkId}/> <span className="font-medium">{totalFavourites}</span></div>
            </div>
        }
    }
};

export default TotalStatistics;
