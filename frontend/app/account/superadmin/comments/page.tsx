import type { Metadata } from "next";
import AllCommentsView from "@/src/components/views/superadmin/AllCommentsView";
import {
  IQueryComments,
  queryCommentsValidator,
} from "@/src/validators/comments/query-comments.validator";
import {ValidationError} from "joi";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
    title: "Усі коментарі",
};

type Props = {
    searchParams: Promise<unknown>;
};

const AllCommentsPage = async ({ searchParams }: Props) => {
    const awaitedSearchParams = await searchParams
    const {error, value}: {error?: ValidationError, value: IQueryComments} = queryCommentsValidator.validate(awaitedSearchParams)
    if(error){
        redirect('/account/superadmin/comments')
    }
    return <AllCommentsView searchParams={value}/>
};

export default AllCommentsPage;
