import {FC} from "react";
import {notFound} from "next/navigation";
import {Heading} from "@heroui/react";
import NoResults from "@/src/components/shared/ui/NoResults";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import {queryNewsType} from "@/src/validators/news/query-news";
import FoodAndDrinkNewsCard from "@/src/components/features/news/FoodAndDrinkNewsCard";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import {getUserFromHeaders} from "@/src/services/server.service";
import NewsTab from "@/src/components/features/news/NewsTab";

type PropsType = {
    query: queryNewsType
}

const FoodAndDrinkNewsView: FC<PropsType> = async ({query}) => {
    const {ownerOf} = await getUserFromHeaders()
    if(!ownerOf){
        return <div>Тільки власники закладу можуть переглядати свої новини</div>
    }
    const {id} = ownerOf
    const {page, category} = query
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { success, data } = await foodAndDrinkService.findNews(id, query);
    if(!success){
        notFound()
    }
    const {total, totalPages, data: newsList} = data
    return (
        <div className="flex flex-col justify-between gap-3 max-sm:gap-2">
            <NewsTab href={'/account/news'} activeCategory={category}/>
            <Heading level={3} className="max-sm:text-lg">Знайдено: {total}</Heading>
            {newsList.length > 0 ?
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-sm:gap-2 mb-2">{newsList.map((news) => <FoodAndDrinkNewsCard href={`account/news`} key={news.id} news={news}/>)}</div>
                : <NoResults text={'Почніть створювати новини!'}/>
            }
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
        </div>
    )
}

export default FoodAndDrinkNewsView