import NewsFeedView from "@/src/components/views/NewsFeedView"
import { queryNews, queryNewsType } from "@/src/validators/news/query-news";
import {ValidationError} from "joi";
import {redirect} from "next/navigation";
import {Metadata} from "next";

type searchParamsType = {
    [K in keyof queryNewsType]: string
}

export const metadata: Metadata = {
    title: 'Новини'
}

type PropsType = {
    searchParams: Promise<searchParamsType>
}

export default async function NewsPage({searchParams}: PropsType) {
    const awaitedSearchParams = await searchParams
    const {error, value}: {error?: ValidationError, value: queryNewsType} = queryNews.validate(awaitedSearchParams)
    if(error){
        redirect('/news')
    }
    return <NewsFeedView query={value}/>
}


