import { queryNews, queryNewsType } from "@/src/validators/news/query-news";
import {ValidationError} from "joi";
import {redirect} from "next/navigation";
import {Metadata} from "next";
import AllNewsView from "@/src/components/views/superadmin/AllNewsView";
import {isSuperadmin} from "@/src/services/server.service";

type searchParamsType = {
    [K in keyof queryNewsType]: string
}

export const metadata: Metadata = {
    title: 'Новини'
}

type PropsType = {
    searchParams: Promise<searchParamsType>
}

export default async function AllNewsPage({searchParams}: PropsType) {
    if(!(await isSuperadmin())){
        return <div>У вас немає прав здійснювати цю дію</div>
    }
    const awaitedSearchParams = await searchParams
    const {error, value}: {error?: ValidationError, value: queryNewsType} = queryNews.validate(awaitedSearchParams)
    if(error){
        redirect('/superadmin/news')
    }
    return <AllNewsView query={value}/>
}


