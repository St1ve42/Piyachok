import {piyachokService} from "@/src/services/piyachok.service";
import {Heading} from "@heroui/react";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import PiyachokCard from "@/src/components/features/piyachok/PiyachokCard";
import NoResults from "@/src/components/shared/ui/NoResults";

const PiyachokFeedView = async () => {
    const piyachokFindResponse = await piyachokService.find()
    if(!piyachokFindResponse.success){
        return <div>Сталась помилка: {piyachokFindResponse.data.message}</div>
    }
    const {total, totalPages, data: piyachoks} = piyachokFindResponse.data
    return (
        <section className="flex flex-col gap-3">
            <Heading level={5}>Знайдено: {total}</Heading>
            {piyachoks.length > 0 ? <div className="grid grid-cols-4 gap-3">{piyachoks.map(piyachok => <PiyachokCard key={piyachok.id} piyachok={piyachok}/>)}</div> : <NoResults/>}
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages}/>}
        </section>
    )
}

export default PiyachokFeedView