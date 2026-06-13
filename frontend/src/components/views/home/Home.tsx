import TabMenu from "@/src/components/ui/tab-menu/TabMenu";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import PaginationWithEclipses from "@/src/components/ui/pagination/PaginationWithEclipses";
import {notFound, redirect} from "next/navigation";
import FoodAndDrinkSearch from "@/src/components/shared/food-and-drink/search/FoodAndDrinkSearch";
import FoodAndDrinkFiltration from "@/src/components/features/food-and-drink/filtration/FoodAndDrinkFiltration";
import FoodAndDrinkSort from "@/src/components/shared/food-and-drink/sort/FoodAndDrinkSort";
import FoodAndDrinkGeoMessage from "@/src/components/features/food-and-drink/geo-message/FoodAndDrinkGeoMessage";
import FoodAndDrinkList from "@/src/components/shared/food-and-drink/list/FoodAndDrinkList";
import { FoodAndDrinkTypeEnum } from "@/src/enums/food-and-drink/food-and-drink-type.enum";

export type FoodAndDrinkSearchParamsType = Record<'name' | 'sortBy', string | undefined> & Record<'rating' | 'averageReceipt[gte]' | 'averageReceipt[lte]', number | undefined> & {type?: FoodAndDrinkTypeEnum} & {sort: 'asc' | 'desc'} & {features?: string[]} & {page: number}

export type PropsType = {
  searchParams: FoodAndDrinkSearchParamsType
}

const Home = async ({searchParams}: PropsType) => {
    const {page, ...restParams} = searchParams
    if(page < 1 || isNaN(page)){
        redirect('/')
    }
    const foodAndDrinkListApiResponse = await foodAndDrinkService.find({limit: 20, page, ...restParams})
    if(!foodAndDrinkListApiResponse){
        return <div>Завантаження...</div>
    }
    if(!foodAndDrinkListApiResponse.success){
        notFound()
    }
    const {data: {total, totalPages, data: foodAndDrinkList}} = foodAndDrinkListApiResponse
    if(page > totalPages && totalPages !== 0){
        console.log(totalPages)
        console.log('It works')
        redirect('/')
    }
    return (
        <div className="flex justify-between">
            <div className="w-[21%] h-[80vh]">
                <FoodAndDrinkFiltration/>
            </div>
            <div className="w-[77%] flex flex-col gap-3">
                <TabMenu/>
                <div className="flex items-center justify-between">
                    <h1>Знайдено: {total}</h1>
                    <div className="flex gap-3">
                        <FoodAndDrinkSort/>
                        <FoodAndDrinkSearch type={'public'}/>
                    </div>
                </div>
                <FoodAndDrinkGeoMessage sortBy={searchParams.sortBy}/>
                <FoodAndDrinkList foodAndDrinkList={foodAndDrinkList} href={'/food-and-drink/'}/>
                {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
            </div>
        </div>
    )
}

export default Home