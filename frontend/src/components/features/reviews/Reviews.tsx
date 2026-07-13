import {Heading, Surface } from "@heroui/react";
import {FC} from "react";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import ReviewCard from "@/src/components/features/reviews/cards/ReviewCard";
import {IUser} from "@/src/interfaces/users/IUser";
import ReviewSort from "@/src/components/features/reviews/ReviewSort";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";
import {ReviewSortByEnum} from "@/src/enums/ReviewSortByEnum";
import ReviewFilter from "@/src/components/features/reviews/food-and-drink-filter/ReviewFilter";
import {SortEnum} from "@/src/enums/shared/SortEnum";
import Link from "next/link";

type PropsType = {
    foodAndDrinkId: string
    user: IUser | null
    isOwner: boolean | null,
    searchParams: {sortBy?: ReviewSortByEnum, sort?: SortEnum, page: number, rating?: number}
}

const Reviews: FC<PropsType> = async ({foodAndDrinkId, user, isOwner, searchParams}) => {
    const {sort, sortBy, page, rating} = searchParams
    const reviews = await foodAndDrinkService.findReviews(foodAndDrinkId, {...searchParams})
    const totalPages = reviews.success ? reviews.data.totalPages : 0
    const filterAndSortComponent = <div className="flex w-full items-center gap-3">
        <ReviewFilter/>
        <div className="w-[80%]">
            <ReviewSort initialSortValue={sort} initialSortByValue={sortBy}/>
        </div>
    </div>
    const emptyDataComponent = rating ? <div className="flex flex-col gap-2">
        {filterAndSortComponent}
        <div className="flex flex-col">
            <p>За Вашим фільтром відгуків не знайдено.</p>
            <Link className="text-blue-600" href={`/food-and-drink/${foodAndDrinkId}`} scroll={false}>Скинути фільтри</Link>
        </div>
    </div> : <div>На даний момент відгуків немає. Будьте першим, хто їх залишить.</div>
    return <Surface className="flex flex-col gap-3 rounded-3xl p-6 border-1" variant="default">
        <Heading level={6}>Відгуки</Heading>
        {reviews.success ?
            (reviews.data.data.length > 0 ?
                <div className="flex flex-col gap-3">
                    {filterAndSortComponent}
                    <div className="max-h-[500px] flex flex-col gap-3 overflow-y-scroll">
                        {reviews.data.data.map(review => <ReviewCard key={review.id} review={review} user={user} isOwner={isOwner} foodAndDrinkId={foodAndDrinkId}/>)}</div></div> : emptyDataComponent)
            : <div>{reviews.data.message}</div>}
        {totalPages > 1 && <PaginationWithEclipses totalPages={totalPages} currentPage={page}/>}
    </Surface>
};

export default Reviews;
