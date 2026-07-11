import {Metadata} from "next";
import MyComments from "@/src/components/views/account/MyComments";
import {FC} from "react";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
    title: 'Мої коментарі'
}

type PropsType = {
    searchParams: Promise<{page?: string}>
}

const CommentsPage: FC<PropsType> = async ({searchParams}) => {
    let {page = 1} = await searchParams
    page = Number(page)
    if(isNaN(page) || page < 1){
        redirect('/account/comments')
    }
    return <MyComments page={page}/>
}

export default CommentsPage