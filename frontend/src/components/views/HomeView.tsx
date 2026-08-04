import TabMenu from "@/src/components/shared/ui/TabMenu";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import {notFound, redirect} from "next/navigation";
import FoodAndDrinkSearch from "@/src/components/features/food-and-drink/search/FoodAndDrinkSearch";
import FoodAndDrinkFiltration from "@/src/components/features/food-and-drink/filtration/FoodAndDrinkFiltration";
import FoodAndDrinkSort from "@/src/components/features/food-and-drink/sort/FoodAndDrinkSort";
import FoodAndDrinkList from "@/src/components/features/food-and-drink/FoodAndDrinkList";
import { FoodAndDrinkTypeEnum } from "@/src/enums/food-and-drink/food-and-drink-type.enum";
import {Heading} from "@heroui/react";
import FiltrationSidebar from "@/src/components/features/food-and-drink/FiltrationSidebar";

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
                <div className="w-[18%] h-[80vh] max-lg:hidden">
                    <FoodAndDrinkFiltration initialTypeValue={type} initialRating={rating} initialFeatures={restParams['features[]']} initialAverageReceipt={[restParams['averageReceipt[gte]'] ?? 0, restParams['averageReceipt[lte]'] ?? 5000]}/>
                </div>
                <div className="w-[77%] flex flex-col gap-3 max-lg:w-full">
                    <Heading level={5} className="lg:hidden">Знайдено: {total}</Heading>
                    <div className="flex gap-3 max-md:flex-col-reverse justify-between items-center">
                        <Heading level={5} className="max-lg:hidden">Знайдено: {total}</Heading>
                        <div className="flex gap-3 max-md:flex-col-reverse items-center">
                            <FoodAndDrinkSort initialSortValue={sort} initialSortByValue={sortBy}/>
                            <div className="flex gap-3">
                                <FiltrationSidebar initialTypeValue={type} initialRating={rating} initialFeatures={restParams['features[]']} initialAverageReceipt={[restParams['averageReceipt[gte]'] ?? 0, restParams['averageReceipt[lte]'] ?? 5000]}/>
                                <FoodAndDrinkSearch type={'public'} initialValue={name}/>
                            </div>
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