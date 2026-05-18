import TabMenu from "@/src/components/ui/tab-menu/TabMenu";

const News = () => {
    return <div className="flex justify-between">
        <div className="w-[21%] h-[80vh] flex items-center flex-col">
            Фільтрація
        </div>
        <div className="w-[77%] flex flex-col gap-4">
            <TabMenu/>
        </div>
    </div>
}

export default News