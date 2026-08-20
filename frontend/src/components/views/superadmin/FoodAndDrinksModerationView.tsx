import {Heading} from "@heroui/react";
import {IFoodAndDrinkOneFromList} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOneFromList";
import {FC} from "react";
import FoodAndDrinkList from "@/src/components/features/food-and-drink/FoodAndDrinkList";
import {IFullData} from "@/src/interfaces/shared/IFullData";
import FoodAndDrinkSearch from "@/src/components/features/food-and-drink/search/FoodAndDrinkSearch";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import {redirect} from "next/navigation";
import Limit from "@/src/components/shared/components/limitation/Limit";
import FoodAndDrinkSort from "@/src/components/features/food-and-drink/sort/FoodAndDrinkSort";

type PropsType = {
    foodAndDrinkListData: IFullData<IFoodAndDrinkOneFromList>
    page: number,
    initialSortValue?: string,
    initialSortByValue?: string,
    initialSearchValue?: string
    limit?: number
    accessCookie: string
}

const FoodAndDrinksModerationView: FC<PropsType> = ({foodAndDrinkListData, page, accessCookie, limit, initialSortValue, initialSortByValue, initialSearchValue}) => {
    const {data, total, totalPages} = foodAndDrinkListData
    if((page > totalPages && totalPages !== 0) || (limit && limit > 20)){
        redirect('/account/superadmin/food-and-drinks/moderate')
    }
    return (
        <div className="h-full flex flex-col gap-3 max-sm:gap-2 mb-5">
            <Heading level={3} className="max-sm:text-lg">Модерація закладів</Heading>
            <Heading level={5} className="max-sm:text-base">Знайдено: {total}</Heading>
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 max-sm:gap-2 max-[500px]:items-stretch max-[500px]:gap-1">
                <div className="max-[500px]:w-full max-[500px]:mb-2"><Limit currentLimit={limit}/></div>
                <div className="flex flex-wrap justify-end items-center gap-2 max-sm:gap-1 max-[500px]:flex-col max-[500px]:items-stretch max-[500px]:gap-1">
                  <div className="max-[500px]:w-full"><FoodAndDrinkSort initialSortValue={initialSortValue} initialSortByValue={initialSortByValue}/></div>
                  <div className="max-[500px]:w-full"><FoodAndDrinkSearch type={'moderate'} accessCookie={accessCookie} initialValue={initialSearchValue}/></div>
                </div>
            </div>
            <FoodAndDrinkList mode={'moderate'} foodAndDrinkList={data} href={'/account/superadmin/food-and-drinks'}/>
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
        </div>
    )
}

export default FoodAndDrinksModerationView