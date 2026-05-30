import TabMenu from "@/src/components/ui/tab-menu/TabMenu";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import PaginationWithEclipses from "@/src/components/ui/pagination/PaginationWithEclipses";
import {notFound, redirect} from "next/navigation";
import FoodAndDrinkSearch from "@/src/components/features/food-and-drink/search/FoodAndDrinkSearch";
import FoodAndDrinkFiltration from "@/src/components/features/food-and-drink/filtration/FoodAndDrinkFiltration";
import FoodAndDrinkSort from "@/src/components/features/food-and-drink/sort/FoodAndDrinkSort";
import FoodAndDrinkGeoMessage from "@/src/components/features/food-and-drink/geo-message/FoodAndDrinkGeoMessage";
import FoodAndDrinkList from "@/src/components/features/food-and-drink/list/FoodAndDrinkList";

type PropsType = {
    searchParams: Record<'name' | 'type' | 'rating' | 'averageReceipt[gte]' | 'averageReceipt[lte]' | 'features[]' | 'sortBy', string | undefined> & {page: number} & {sort: 'asc' | 'desc'}
}

const Home = async ({searchParams}: PropsType) => {
    const {page, ...restParams} = searchParams
    if(page < 1){
        redirect('/')
    }
    const foodAndDrinkListApiResponse = await foodAndDrinkService.find({limit: 20, page, ...restParams})
    if(!foodAndDrinkListApiResponse){
        return <div>Завантаження...</div>
    }
    if(!foodAndDrinkListApiResponse.success){
        notFound()
    }
    const {data: {total, limit, skip, data: foodAndDrinkList}} = foodAndDrinkListApiResponse
    const totalPages = Math.ceil((total-skip)/limit)
    if(page > totalPages && totalPages !== 0){
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
                        <FoodAndDrinkSearch/>
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