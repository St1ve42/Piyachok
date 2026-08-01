import {IBaseQuery} from "@/src/interfaces/shared/IBaseQuery";
import {FC} from "react";
import {topCategoryService} from "@/src/services/top-category.service";
import {Heading} from "@heroui/react";
import NoResults from "@/src/components/shared/ui/NoResults";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import FoodAndDrinkCard from "@/src/components/features/food-and-drink/FoodAndDrinkCard";
import {getAccessCookie} from "@/src/services/server.service";

type PropsType = {
    id: string,
    query: IBaseQuery
}

const FoodAndDrinkByCategory: FC<PropsType> = async ({id, query}) => {
    const accessCookie = await getAccessCookie()
    const foodAndDrinksResponse = await topCategoryService.findFoodAndDrinks(id, accessCookie, query)
    if(!foodAndDrinksResponse.success){
        return <div>Сталась помилка: {foodAndDrinksResponse.data.message}</div>
    }
    const {data: {topCategory, foodAndDrinks}, total, totalPages} = foodAndDrinksResponse.data
    return (
        <section className="flex flex-col gap-3 max-sm:gap-2">
            <Heading level={5} className="max-sm:text-base">Усі заклади за топ категорією &#34;{topCategory}&#34;</Heading>
            <Heading level={5} className="max-sm:text-base">Знайдено: {total}</Heading>
            {foodAndDrinks.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-sm:gap-2">
                {foodAndDrinks.map(foodAndDrink => <FoodAndDrinkCard key={foodAndDrink.id} foodAndDrinkOneFromList={foodAndDrink} id={foodAndDrink.id} href={'/account/superadmin/food-and-drinks'} mode={'superadmin-top'} categoryId={id}/>)}
            </div> : <NoResults/>}
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages}/>}
        </section>
    )
}

export default FoodAndDrinkByCategory