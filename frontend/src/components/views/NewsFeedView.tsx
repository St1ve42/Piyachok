import TabMenu from "@/src/components/shared/ui/TabMenu";
import NewsTab from "@/src/components/features/news/NewsTab";
import {newsService} from "@/src/services/news.service";
import {notFound} from "next/navigation";
import {Heading} from "@heroui/react";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import NoResults from "@/src/components/shared/ui/NoResults";
import NewsCard from "@/src/components/features/news/NewsCard";
import {queryNewsType} from "@/src/validators/news/query-news";
import {FC} from "react";

type PropsType = {
    query: queryNewsType
}

const NewsFeedView: FC<PropsType> = async ({query}) => {
    const {page, category} = query
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { success, data } = await newsService.find(query);
    if(!success){
        notFound()
    }
    const {total, totalPages, data: newsList} = data
    return <div className="flex justify-between flex-col gap-1">
        <TabMenu/>
        <NewsTab activeCategory={category}/>
        <div className="flex flex-col gap-3">
            <Heading level={5}>Знайдено: {total}</Heading>
            {newsList.length > 0 ?
                <div className="grid grid-cols-4 gap-3">{newsList.map((news) => <NewsCard key={news.id} news={news}/>)}</div>
                : <div className="mt-20"><NoResults/></div>
            }
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
        </div>
    </div>
}

export default NewsFeedView