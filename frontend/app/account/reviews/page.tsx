import {Metadata} from "next";
import MyReviews from "@/src/components/views/account/MyReviews";
import { FC } from "react";
import {
  queryReviewType,
} from "@/src/validators/review/query-review.validator";
import {redirect} from "next/navigation";
import {ValidationError} from "joi";
import {UserReviewSearchByEnum} from "@/src/enums/review/UserReviewSearchByEnum";
import {userQueryReviewValidator} from "@/src/validators/review/user-query-review.validator";

export const metadata: Metadata = {
    title: 'Мої відгуки'
}

type PropsType = {
    searchParams: Promise<Record<'page' | 'rating', string | undefined> & {sortBy?: string, sort?: string, searchBy?: UserReviewSearchByEnum, search: string}>,
}

const ReviewsPage: FC<PropsType> = async ({searchParams}) => {
    const awaitedSearchParams = await searchParams
    const {error, value}: {error?: ValidationError, value: queryReviewType} = userQueryReviewValidator.validate(awaitedSearchParams)
    if(error){
        redirect('/account/reviews')
    }
    return <MyReviews searchParams={value}/>
}

export default ReviewsPage