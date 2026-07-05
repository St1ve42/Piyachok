'use client'
import TabMenu from "@/src/components/shared/ui/TabMenu";
import ReadOnlyStarRating from "@/src/components/shared/ui/ReadOnlyStarRating";

const News = () => {
    return <div className="flex justify-between">
        <div className="w-[21%] h-[80vh] flex items-center flex-col">
            Фільтрація
        </div>
        <ReadOnlyStarRating initialValue={4}/>
        <div className="w-[77%] flex flex-col gap-4">
            <TabMenu/>
        </div>
    </div>
}

export default News