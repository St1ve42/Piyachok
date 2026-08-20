import {getAccessCookie} from "@/src/services/server.service";
import {UserReviewSearchByEnum} from "@/src/enums/review/UserReviewSearchByEnum";
import ReviewSort from "@/src/components/features/reviews/ReviewSort";
import ReviewSearch from "@/src/components/features/reviews/search/ReviewSearch";
import {Heading} from "@heroui/react";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import {superadminReviewsService} from "@/src/services/superadmin-reviews.service";
import {userQueryReviewType} from "@/src/validators/review/user-query-review.validator";
import {FC} from "react";
import SuperadminReviewCard from "@/src/components/features/reviews/cards/SuperadminReviewCard";
import SuperadminReviewFilter from "@/src/components/features/reviews/superadmin-filter/SuperadminReviewFilter";
import Limit from "@/src/components/shared/components/limitation/Limit";
import NoResults from "@/src/components/shared/ui/NoResults";

type PropsType = {
    searchParams: userQueryReviewType
}

const AllReviewsView: FC<PropsType> = async ({searchParams}) => {
    const {page, sort, sortBy, rating, limit} = searchParams
    const {search, searchBy = UserReviewSearchByEnum.TEXT, ...restSearchParams} = searchParams
    const accessCookie = await getAccessCookie()
    const reviews = await superadminReviewsService.find({...restSearchParams, [searchBy]: search}, {headers: {'Cookie': accessCookie}})
    if(!reviews.success){
        return <div>{reviews.data.message}</div>
    }
    const {total, totalPages} = reviews.data
    return (
        <section className="flex flex-col gap-3 max-sm:gap-2 pr-15 max-sm:pr-0">
            <Heading level={3} className="max-sm:text-lg">Усі відгуки</Heading>
            <Heading level={5} className="max-sm:text-base">Знайдено: {total}</Heading>
            <div className="flex flex-wrap justify-end items-center gap-2 max-sm:gap-1 max-[500px]:flex-col max-[500px]:items-stretch max-[500px]:gap-1">
                <div className="max-[500px]:w-full max-[500px]:mb-2"><Limit currentLimit={limit}/></div>
                <div className="max-[500px]:w-full"><ReviewSort initialSortValue={sort} initialSortByValue={sortBy}/></div>
                <div className="flex gap-3 items-center">
                    <div className="max-[500px]:w-full"><SuperadminReviewFilter initialSearchByValue={searchBy} rating={rating}/></div>
                    <div className="max-[500px]:w-full"><ReviewSearch initialSearchValue={search}/></div>
                </div>
            </div>
            {reviews.data.data.length > 0 ?
                    <div className="flex flex-col gap-3 max-sm:gap-2 mb-3">
                        {reviews.data.data.map(review => <SuperadminReviewCard key={review.id} review={review}/>)}
                    </div>
                : <NoResults queryNamesToRemove={['rating']}/>}
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
        </section>
    )
}

export default AllReviewsView