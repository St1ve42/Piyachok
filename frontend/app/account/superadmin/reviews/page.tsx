import type { Metadata } from "next";
import AllReviewsView from "@/src/components/views/superadmin/AllReviewsView";
import {ValidationError} from "joi";
import {queryReviewType} from "@/src/validators/review/query-review.validator";
import {userQueryReviewValidator} from "@/src/validators/review/user-query-review.validator";
import {redirect} from "next/navigation";
import {UserReviewSearchByEnum} from "@/src/enums/review/UserReviewSearchByEnum";
import {FC} from "react";

export const metadata: Metadata = {
  title: "Усі відгуки",
};

type PropsType = {
    searchParams: Promise<Record<'page' | 'rating', string | undefined> & {sortBy?: string, sort?: string, searchBy?: UserReviewSearchByEnum, search: string}>,
}

const AllReviewsPage: FC<PropsType> = async ({ searchParams }) => {
    const awaitedSearchParams = await searchParams
    const {error, value}: {error?: ValidationError, value: queryReviewType} = userQueryReviewValidator.validate(awaitedSearchParams)
    if(error){
        redirect('/account/superadmin/reviews')
    }
    return <AllReviewsView searchParams={value}/>;
};

export default AllReviewsPage;
