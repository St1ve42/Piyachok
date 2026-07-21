import TabMenu from "@/src/components/shared/ui/TabMenu";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import {notFound, redirect} from "next/navigation";
import FoodAndDrinkSearch from "@/src/components/features/food-and-drink/search/FoodAndDrinkSearch";
import FoodAndDrinkFiltration from "@/src/components/features/food-and-drink/filtration/FoodAndDrinkFiltration";
import FoodAndDrinkSort from "@/src/components/features/food-and-drink/sort/FoodAndDrinkSort";
import FoodAndDrinkList from "@/src/components/features/food-and-drink/FoodAndDrinkList";
import { FoodAndDrinkTypeEnum } from "@/src/enums/food-and-drink/food-and-drink-type.enum";

export type FoodAndDrinkSearchParamsType = Record<'name' | 'sortBy', string | undefined> & Record<'rating' | 'averageReceipt[gte]' | 'averageReceipt[lte]', number | undefined> & {type?: FoodAndDrinkTypeEnum} & {sort: 'asc' | 'desc'} & {"features[]"?: string[] | string} & {page: number}

export type PropsType = {
  searchParams: FoodAndDrinkSearchParamsType
}

const HomeView = async ({searchParams}: PropsType) => {
    const {page, ...restParams} = searchParams
    const {sort, sortBy, type, rating} = restParams
    const {name} = restParams
    if(page < 1 || isNaN(page)){
        redirect('/')
    }
    const foodAndDrinkListApiResponse = await foodAndDrinkService.find({page, ...restParams})
    if(!foodAndDrinkListApiResponse){
        return <div>Завантаження...</div>
    }
    if(!foodAndDrinkListApiResponse.success){
        notFound()
    }
    const {data: {total, totalPages, data: foodAndDrinkList}} = foodAndDrinkListApiResponse
    if(page > totalPages && totalPages !== 0){
        redirect('/')
    }
    return (
        <section>
            <TabMenu/>
            <div className="flex justify-between">
                <div className="w-[18%] h-[80vh]">
                    <FoodAndDrinkFiltration initialTypeValue={type} initialRating={rating} initialFeatures={restParams['features[]']} initialAverageReceipt={[restParams['averageReceipt[gte]'] ?? 0, restParams['averageReceipt[lte]'] ?? 5000]}/>
                </div>
                <div className="w-[77%] flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <h1>Знайдено: {total}</h1>
                        <div className="flex gap-3">
                            <FoodAndDrinkSort initialSortValue={sort} initialSortByValue={sortBy}/>
                            <FoodAndDrinkSearch type={'public'} initialValue={name}/>
                        </div>
                    </div>
                    <FoodAndDrinkList mode={'default'} foodAndDrinkList={foodAndDrinkList} href={'/food-and-drink/'}/>
                    {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
                </div>
            </div>
        </section>
    )
}

export default HomeView