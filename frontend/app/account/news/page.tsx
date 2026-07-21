import type { Metadata } from "next";
import {ValidationError} from "joi";
import { queryNews, queryNewsType } from "@/src/validators/news/query-news";
import {redirect} from "next/navigation";
import FoodAndDrinkNewsView from "@/src/components/views/account/news/FoodAndDrinkNewsView";

export type searchParamsType = {
    [K in keyof queryNewsType]: string
}

export const metadata: Metadata = {
    title: 'Новини закладу'
}

type PropsType = {
    searchParams: Promise<searchParamsType>
}

const FoodAndDrinkOwnerNewsPage = async ({ searchParams }: PropsType) => {
    const awaitedSearchParams = await searchParams
    const {error, value}: {error?: ValidationError, value: queryNewsType} = queryNews.validate(awaitedSearchParams)
    if(error){
        redirect('/account/news')
    }
    return <FoodAndDrinkNewsView query={value}/>;
};

export default FoodAndDrinkOwnerNewsPage;
