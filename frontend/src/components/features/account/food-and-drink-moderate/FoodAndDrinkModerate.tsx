'use client'
import {Heading} from "@heroui/react";
import {IFoodAndDrinkOneFromList} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOneFromList";
import {FC} from "react";
import FoodAndDrinkList from "@/src/components/features/food-and-drink/list/FoodAndDrinkList";
import {IFullData} from "@/src/interfaces/shared/IFullData";
import FoodAndDrinkSearch from "@/src/components/features/food-and-drink/search/FoodAndDrinkSearch";
import PaginationWithEclipses from "@/src/components/ui/pagination/PaginationWithEclipses";
import {redirect} from "next/navigation";

type PropsType = {
    foodAndDrinkListData: IFullData<IFoodAndDrinkOneFromList>
    page: number
}

const FoodAndDrinkModerate: FC<PropsType> = ({foodAndDrinkListData, page}) => {
    const {data, limit, skip, total} = foodAndDrinkListData
    const totalPages = Math.ceil((total-skip)/limit)
    if(page > totalPages && totalPages > 0){
        redirect('/account/superadmin/food-and-drinks/moderate')
    }
    return (
        <div className="h-full">
            <Heading level={3} className="mb-3">Модерація закладів</Heading>
            <div className="flex items-center justify-between">
                <h1>Знайдено: {total}</h1>
                <FoodAndDrinkSearch/>
            </div>
            <FoodAndDrinkList isPrivate foodAndDrinkList={data} href={'/account/superadmin/food-and-drinks'}/>
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
        </div>
    )
}

export default FoodAndDrinkModerate