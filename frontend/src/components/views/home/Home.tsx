import TabMenu from "@/src/components/ui/tab-menu/TabMenu";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import PaginationWithEclipses from "@/src/components/ui/pagination/PaginationWithEclipses";
import Loading from "@/app/loading";
import {redirect} from "next/navigation";
import FoodAndDrinkCard from "@/src/components/features/food-and-drink/food-and-drink-card/FoodAndDrinkCard";
import FoodAndDrinkSearch from "@/src/components/features/food-and-drink/food-and-drink-search/FoodAndDrinkSearch";
import FoodAndDrinkFiltration from "@/src/components/features/food-and-drink/food-and-drink-filtration/FoodAndDrinkFiltration";

type PropsType = {
    searchParams: {page: number, search: string}
}

const Home = async ({searchParams}: PropsType) => {
    const {page, search} = searchParams
    const foodAndDrinkListApiResponse = await foodAndDrinkService.find({limit: 1, page, search: {name: search}})
    if(!foodAndDrinkListApiResponse){
        Loading()
    }
    if(!foodAndDrinkListApiResponse.success){
        return <div>Сталась помилка при відображені списку</div>
    }
    const {data: {total, limit, skip, data: foodAndDrinkList}} = foodAndDrinkListApiResponse
    const totalPages = Math.ceil(total/limit + skip)
    if(page > totalPages && foodAndDrinkList.length !== 0){
        redirect('/')
    }
    return (
        <div className="flex justify-between">
            <div className="w-[21%] h-[80vh] border-r-2">
                <FoodAndDrinkFiltration/>
            </div>
            <div className="w-[77%] flex flex-col gap-2">
                <TabMenu/>
                <div className="self-end mt-2">
                    <FoodAndDrinkSearch/>
                </div>
                {foodAndDrinkList.length !== 0 && <h1>Знайдено: {total}</h1>}
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