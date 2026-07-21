import { Heading } from "@heroui/react";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import {userService} from "@/src/services/users.service";
import MyReviewCard from "@/src/components/features/reviews/cards/MyReviewCard";
import {getAccessCookie} from "@/src/services/server.service";
import {FC} from "react";
import NoResults from "@/src/components/shared/ui/NoResults";

type PropsType = {
    page: number
}

const MyReviewsView: FC<PropsType> = async ({page}) => {
    const accessCookie = await getAccessCookie()
    const {success, data} = await userService.findMyReviews({page}, accessCookie)
    const total = success ? data.total : 0
    const totalPages = success ? data.totalPages : 0
    const emptyDataComponent = <div className="mt-5"><NoResults text={'Почніть писати відгуки!'}/></div>
    return (
        <section className="flex flex-col gap-3 pr-15">
            <Heading level={3}>Мої відгуки</Heading>
            <Heading level={5}>Знайдено: {total}</Heading>
            {success ? (data.data.length > 0 ?
                        <div className="flex flex-col gap-3 mb-3">
                            {data.data.map(review => <MyReviewCard key={review.id} review={review}/>)}
                        </div>
                : emptyDataComponent) : <div>{data.message}</div>}
            {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
        </section>
    )
}

export default MyReviewsView