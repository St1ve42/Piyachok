import TabMenu from "@/src/components/ui/tab-menu/TabMenu";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import PaginationWithEclipses from "@/src/components/ui/pagination/PaginationWithEclipses";
import {notFound, redirect} from "next/navigation";
import FoodAndDrinkCard from "@/src/components/features/food-and-drink/card/FoodAndDrinkCard";
import FoodAndDrinkSearch from "@/src/components/features/food-and-drink/search/FoodAndDrinkSearch";
import FoodAndDrinkFiltration from "@/src/components/features/food-and-drink/filtration/FoodAndDrinkFiltration";
import FoodAndDrinkSort from "@/src/components/features/food-and-drink/sort/FoodAndDrinkSort";
import FoodAndDrinkGeoMessage from "@/src/components/features/food-and-drink/geo-message/FoodAndDrinkGeoMessage";

type PropsType = {
    searchParams: Record<'name' | 'type' | 'rating' | 'averageReceipt[gte]' | 'averageReceipt[lte]' | 'features[]' | 'sortBy', string | undefined> & {page: number} & {sort: 'asc' | 'desc'}
}

const Home = async ({searchParams}: PropsType) => {
    const {page, ...restParams} = searchParams
    const foodAndDrinkListApiResponse = await foodAndDrinkService.find({limit: 20, page, ...restParams})
    if(!foodAndDrinkListApiResponse){
        return <div>Завантаження...</div>
    }
    if(!foodAndDrinkListApiResponse.success){
        notFound()
    }
    const {data: {total, limit, skip, data: foodAndDrinkList}} = foodAndDrinkListApiResponse
    const totalPages = Math.ceil(total/limit + skip)
    if(page > totalPages && foodAndDrinkList.length !== 0){
        redirect('/')
    }
    return (
        <div className="flex justify-between">
            <div className="w-[21%] h-[80vh]">
                <FoodAndDrinkFiltration/>
            </div>
            <div className="w-[77%] flex flex-col gap-4">
                <TabMenu/>
                <div className="self-end mt-2">
                    <FoodAndDrinkSearch/>
                </div>
                {foodAndDrinkList.length !== 0 && <div className="flex justify-between">
                    <h1>Знайдено: {total}</h1>
                    <FoodAndDrinkSort/>
                </div>}
                <FoodAndDrinkGeoMessage sortBy={searchParams.sortBy}/>
                    {foodAndDrinkList.length !== 0 ?
                            <div className="grid grid-cols-3 w-full gap-3 mb-5">{foodAndDrinkList.map(foodAndDrink => <FoodAndDrinkCard
                            key={foodAndDrink.id} foodAndDrinkOneFromList={foodAndDrink}/>)} </div>
                        :
                        <p>За Вашим запитом закладів не знайдено.</p>}
                {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
            </div>
        </div>
    )
}

export default Home