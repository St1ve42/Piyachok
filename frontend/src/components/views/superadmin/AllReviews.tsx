import {getAccessCookie} from "@/src/services/server.service";
import {UserReviewSearchByEnum} from "@/src/enums/review/UserReviewSearchByEnum";
import ReviewSort from "@/src/components/features/reviews/ReviewSort";
import ReviewSearch from "@/src/components/features/reviews/search/ReviewSearch";
import Link from "next/link";
import {Heading} from "@heroui/react";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import {superadminReviewsService} from "@/src/services/superadmin-reviews.service";
import {userQueryReviewType} from "@/src/validators/review/user-query-review.validator";
import {FC} from "react";
import SuperadminReviewCard from "@/src/components/features/reviews/cards/SuperadminReviewCard";
import SuperadminReviewFilter from "@/src/components/features/reviews/superadmin-filter/SuperadminReviewFilter";

type PropsType = {
    searchParams: userQueryReviewType
}

const AllReviews: FC<PropsType> = async ({searchParams}) => {
    const {page, sort, sortBy, rating} = searchParams
    const {search, searchBy, ...restSearchParams} = searchParams
    const accessCookie = await getAccessCookie()
    const searchObj = searchBy ? {[searchBy]: search} : {[UserReviewSearchByEnum.TEXT]: search}
    const reviews = await superadminReviewsService.find({...restSearchParams, ...searchObj}, {headers: {'Cookie': accessCookie}})
    if(!reviews.success){
        return <div>{reviews.data.message}</div>
    }
    const {total, totalPages} = reviews.data
    const filterAndSortComponent = <div className="flex justify-end items-center gap-2">
        <ReviewSort initialSortValue={sort} initialSortByValue={sortBy}/>
        <SuperadminReviewFilter/>
        <ReviewSearch searchBy={searchBy} type={'superadmin'}/>
    </div>
    const emptyDataComponent = rating || searchBy || search ? <div className="flex flex-col gap-2">
        {filterAndSortComponent}
        <div className="flex flex-col">
            <p>За Вашим фільтром відгуків не знайдено.</p>
            <Link className="text-blue-600" href={`/account/superadmin/reviews`} scroll={false}>Скинути фільтри</Link>
        </div>
    </div> : <div>Відгуків немає</div>
    return (
        <section className="flex flex-col gap-3 pr-15">
            <Heading level={3}>Усі відгуки</Heading>
            <Heading level={5}>Знайдено: {total}</Heading>
            {reviews.data.data.length > 0 ?
                <div className="flex flex-col gap-3">
                    {filterAndSortComponent}
                    <div className="flex flex-col gap-3 mb-3">
                        {reviews.data.data.map(review => <SuperadminReviewCard key={review.id} review={review}/>)}
                    </div>
                </div> : emptyDataComponent}
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
        </section>
    )
}

export default AllReviews