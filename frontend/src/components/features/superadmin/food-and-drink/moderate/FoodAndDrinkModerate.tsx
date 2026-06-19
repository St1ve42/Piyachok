'use client'
import {Heading} from "@heroui/react";
import {IFoodAndDrinkOneFromList} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOneFromList";
import {FC} from "react";
import FoodAndDrinkList from "@/src/components/shared/food-and-drink/list/FoodAndDrinkList";
import {IFullData} from "@/src/interfaces/shared/IFullData";
import FoodAndDrinkSearch from "@/src/components/shared/food-and-drink/search/FoodAndDrinkSearch";
import PaginationWithEclipses from "@/src/components/ui/pagination/PaginationWithEclipses";
import {redirect} from "next/navigation";
import Limit from "@/src/components/ui/limitation/Limit";
import FoodAndDrinkSort from "@/src/components/shared/food-and-drink/sort/FoodAndDrinkSort";

type PropsType = {
    foodAndDrinkListData: IFullData<IFoodAndDrinkOneFromList>
    page: number
    limit: number
    accessCookie: string
}

const FoodAndDrinkModerate: FC<PropsType> = ({foodAndDrinkListData, page, accessCookie, limit}) => {
    const {data, total, totalPages} = foodAndDrinkListData
    if((page > totalPages && totalPages !== 0) || limit > 20){
        redirect('/account/superadmin/food-and-drinks/moderate')
    }
    return (
        <div className="h-full flex flex-col gap-3">
            <Heading level={3}>Модерація закладів</Heading>
            <Heading level={5}>Знайдено: {total}</Heading>
            <div className="flex items-center justify-between">
                <Limit currentLimit={limit}/>
                <div className="flex gap-3 items-center">
                  <FoodAndDrinkSort/>
                  <FoodAndDrinkSearch type={'moderate'} accessCookie={accessCookie}/>
                </div>
            </div>
            <FoodAndDrinkList mode={'moderate'} foodAndDrinkList={data} href={'/account/superadmin/food-and-drinks'}/>
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
        </div>
    )
}

export default FoodAndDrinkModerate