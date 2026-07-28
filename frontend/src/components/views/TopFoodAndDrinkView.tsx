import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import {notFound} from "next/navigation";
import {Heading} from "@heroui/react";
import NoResults from "@/src/components/shared/ui/NoResults";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import FoodAndDrinkCard from "@/src/components/features/food-and-drink/FoodAndDrinkCard";
import {FC} from "react";

type PropsType = {
    page: number
}

const TopFoodAndDrinkView: FC<PropsType> = async ({page}) => {
    const topFoodAndDrinksResponse = await foodAndDrinkService.find({isTop: true, page})
    if(!topFoodAndDrinksResponse.success){
        notFound()
    }
    const {data: topFoodAndDrinks, total, totalPages} = topFoodAndDrinksResponse.data
    return (
        <section className="flex flex-col gap-3">
            <Heading level={3}>Знайдено: {total}</Heading>
            {topFoodAndDrinks.length > 0 ?
                <div className="grid grid-cols-4 gap-3">{topFoodAndDrinks.map((topFoodAndDrink) => <FoodAndDrinkCard key={topFoodAndDrink.id} id={topFoodAndDrink.id} href={`/food-and-drink`} foodAndDrinkOneFromList={topFoodAndDrink} mode={'top'}/>)}</div>
                : <div className="mt-20"><NoResults/></div>
            }
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
        </section>
    )
}

export default TopFoodAndDrinkView