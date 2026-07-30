import {newsService} from "@/src/services/news.service";
import {notFound} from "next/navigation";
import NewsTab from "@/src/components/features/news/NewsTab";
import {Heading} from "@heroui/react";
import NoResults from "@/src/components/shared/ui/NoResults";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import FoodAndDrinkNewsCard from "@/src/components/features/news/FoodAndDrinkNewsCard";
import {queryNewsType} from "@/src/validators/news/query-news";
import {FC} from "react";
import NewsSearch from "@/src/components/features/news/NewsSearch";
import {NewsCategoryEnum} from "@/src/enums/news/news-category.enum";

type PropsType = {
    query: queryNewsType
}

const AllNewsView: FC<PropsType> = async ({query}) => {
    const {search, ...restSearch} = query
    const {page, category} = query
    const { success, data } = await newsService.find({...restSearch, title: search});
    if(!success){
        notFound()
    }
    const {total, totalPages, data: newsList} = data
    return <div className="flex justify-between flex-col gap-1">
        <NewsTab href={'/account/superadmin/news'} activeCategory={category}/>
        <div className="flex flex-col gap-3">
            <Heading level={3}>Знайдено: {total}</Heading>
            <div className="self-end">
                <NewsSearch category={category ?? NewsCategoryEnum.GENERAL} initialSearchValue={search}/>
            </div>
            {newsList.length > 0 ?
                <div className="grid grid-cols-3 gap-3">{newsList.map((news) => <FoodAndDrinkNewsCard key={news.id} news={news} href={'account/news/'}/>)}</div>
                : <NoResults isButtonClearFilters={false}/>
            }
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
        </div>
    </div>
}

export default AllNewsView