import type { Metadata } from "next";
import AllComments from "@/src/components/views/superadmin/AllComments";
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
    return <AllComments searchParams={value}/>
};

export default AllCommentsPage;
