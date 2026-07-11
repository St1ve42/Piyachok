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

type PropType = {
    foodAndDrinkListData: IFullData<IFoodAndDrinkOneFromList>
    page: number
    accessCookie: string
    limit: number
}

const SuperadminFoodAndDrinks: FC<PropType> = ({foodAndDrinkListData, page, accessCookie, limit}) => {
    const {data, total, totalPages} = foodAndDrinkListData
    if((page > totalPages && totalPages !== 0) || limit > 20){
        redirect('/account/superadmin/food-and-drinks')
    }
    return (
        <section className="h-full flex flex-col gap-3">
            <Heading level={3}>Усі заклади</Heading>
            <Heading level={5}>Знайдено: {total}</Heading>
            <div className="flex items-center justify-between">
                      <Limit currentLimit={limit}/>
                      <div className="flex gap-3">
                        <FoodAndDrinkSort/>
                        <FoodAndDrinkSearch type={'all'} accessCookie={accessCookie}/>
                      </div>
            </div>
            <FoodAndDrinkList mode={'default'} foodAndDrinkList={data} href={'/account/superadmin/food-and-drinks'}/>
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
        </section>
    )
}

export default SuperadminFoodAndDrinks