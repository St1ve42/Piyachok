import type { Metadata } from "next";
import TopCategoriesView from "@/src/components/views/superadmin/TopCategoriesView";
import { ValidationError } from "joi";
import {
  queryCommentsValidator,
} from "@/src/validators/comments/query-comments.validator";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
  title: "Топ категорії",
};

type Props = {
    searchParams: Promise<{page?: number}>;
};

const TopCategoriesPage = async ({ searchParams }: Props) => {
    const awaitedSearchParams = await searchParams
    const {error, value}: {error?: ValidationError, value: {page: number}} = queryCommentsValidator.validate(awaitedSearchParams)
    if(error){
        redirect('/account/superadmin/top-categories')
    }
    const {page} = value
    return <TopCategoriesView page={page}/>
};

export default TopCategoriesPage;
