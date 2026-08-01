import {Heading} from "@heroui/react";
import {topCategoryService} from "@/src/services/top-category.service";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import NoResults from "@/src/components/shared/ui/NoResults";
import TopCategoryCard from "@/src/components/features/top-category/TopCategoryCard";
import {getAccessCookie} from "@/src/services/server.service";
import CreateOrUpdateTopCategory from "@/src/components/features/top-category/CreateOrUpdateTopCategory";
import {FC} from "react";

type PropsType = {
    page: number
}

const TopCategoriesView: FC<PropsType> = async ({page}) => {
    const accessCookie = await getAccessCookie()
    const topCategories = await topCategoryService.find(accessCookie, {page})
    if(!topCategories.success){
        return <div>Сталась помилка: {topCategories.data.message}</div>
    }
    const {data: topCategoriesList, total, totalPages} = topCategories.data
    return (
        <section className="flex flex-col gap-3 max-sm:gap-2">
            <Heading className="max-sm:text-xl">Усі топ категорії</Heading>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 max-sm:gap-2">
                <Heading level={5} className="max-sm:text-base">Знайдено: {total}</Heading>
                <CreateOrUpdateTopCategory/>
            </div>
            {topCategoriesList.length > 0 ? <div className="flex flex-col gap-3 max-sm:gap-2">
                {topCategoriesList.map(topCategory => <TopCategoryCard key={topCategory.id} topCategory={topCategory}/>)}
            </div> : <NoResults/>}
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
        </section>
    )
}

export default TopCategoriesView