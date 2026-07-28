import {Heading} from "@heroui/react";
import {topCategoryService} from "@/src/services/top-category.service";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import NoResults from "@/src/components/shared/ui/NoResults";
import TopCategoryCard from "@/src/components/features/top-category/TopCategoryCard";
import {getAccessCookie} from "@/src/services/server.service";
import CreateOrUpdateTopCategory from "@/src/components/features/top-category/CreateOrUpdateTopCategory";

const TopCategoriesView = async () => {
    const accessCookie = await getAccessCookie()
    const topCategories = await topCategoryService.find(accessCookie)
    if(!topCategories.success){
        return <div>Сталась помилка: {topCategories.data.message}</div>
    }
    const {data: topCategoriesList, total, totalPages} = topCategories.data
    return (
        <section className="flex flex-col gap-3">
            <Heading>Усі топ категорії</Heading>
            <div className="flex justify-between">
                <Heading level={5}>Знайдено: {total}</Heading>
                <CreateOrUpdateTopCategory/>
            </div>
            {topCategoriesList.length > 0 ? <div className="flex flex-col gap-3">
                {topCategoriesList.map(topCategory => <TopCategoryCard key={topCategory.id} topCategory={topCategory}/>)}
            </div> : <NoResults/>}
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages}/>}
        </section>
    )
}

export default TopCategoriesView