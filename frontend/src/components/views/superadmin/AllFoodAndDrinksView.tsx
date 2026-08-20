import {IFullData} from "@/src/interfaces/shared/IFullData";
import {FC} from "react";
import {redirect} from "next/navigation";
import {Heading} from "@heroui/react";
import FoodAndDrinkSearch from "@/src/components/features/food-and-drink/search/FoodAndDrinkSearch";
import FoodAndDrinkList from "@/src/components/features/food-and-drink/FoodAndDrinkList";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import {IFoodAndDrinkOneFromList} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOneFromList";
import FoodAndDrinkSort from "@/src/components/features/food-and-drink/sort/FoodAndDrinkSort";
import Limit from "@/src/components/shared/components/limitation/Limit";
import FoodAndDrinkSuperadminFilter from "@/src/components/features/food-and-drink/superadmin/FoodAndDrinkSuperadminFilter";
import {FoodAndDrinkStatusEnum} from "@/src/enums/food-and-drink/food-and-drink-status.enum";
import {IFoodAndDrinkQuery} from "@/src/interfaces/shared/IBaseQuery";

type PropType = {
    foodAndDrinkListData: IFullData<IFoodAndDrinkOneFromList>
    page: number,
    searchParams: IFoodAndDrinkQuery & {status?: FoodAndDrinkStatusEnum}
    accessCookie: string
    limit?: number
}

const AllFoodAndDrinksView: FC<PropType> = ({foodAndDrinkListData, page, accessCookie, limit, searchParams}) => {
    const {sort, sortBy, name, status} = searchParams
    const {data, total, totalPages} = foodAndDrinkListData
    if((page > totalPages && totalPages !== 0)){
        redirect('/account/superadmin/food-and-drinks')
    }
    return (
        <section className="h-full flex flex-col gap-3 max-sm:gap-2">
            <Heading level={3} className="max-sm:text-lg">Усі заклади</Heading>
            <Heading level={5} className="max-sm:text-base">Знайдено: {total}</Heading>
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 max-sm:gap-2 max-[500px]:items-stretch max-[500px]:gap-1">
                      <div className="max-[500px]:w-full max-[500px]:mb-2">
                        <Limit currentLimit={limit}/>
                      </div>
                      <div className="flex flex-wrap justify-end items-center gap-2 max-sm:gap-1 max-[500px]:flex-col max-[500px]:items-stretch max-[500px]:gap-1">
                        <div className="max-[500px]:w-full"><FoodAndDrinkSort initialSortByValue={sortBy} initialSortValue={sort}/></div>
                          <div className="flex gap-2 items-center">
                            <div className="max-[500px]:w-full"><FoodAndDrinkSuperadminFilter status={status}/></div>
                            <div className="max-[500px]:w-full"><FoodAndDrinkSearch type={'all'} accessCookie={accessCookie} initialValue={name}/></div>
                          </div>
                      </div>
            </div>
            <FoodAndDrinkList mode={'all'} foodAndDrinkList={data} href={'/account/superadmin/food-and-drinks'}/>
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
        </section>
    )
}

export default AllFoodAndDrinksView