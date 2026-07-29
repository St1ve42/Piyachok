import type {Metadata} from "next";
import PiyachokFeedView from "@/src/components/views/PiyachokFeedView";
import {FC} from "react";
import {basePaginationValidator} from "@/src/validators/shared/base.pagination.schema";
import {ValidationError} from "joi";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
    title: 'Пиячок'
};

type PropsType = {
    searchParams: Promise<{page?: number}>
}

const PiyachokPage: FC<PropsType> = async ({searchParams}) => {
    const awaitedSearchParams = await searchParams
    const {error, value}: {error?: ValidationError, value: {page: number}} = basePaginationValidator.validate(awaitedSearchParams)
    if(error){
        redirect('/piyachok')
    }
    const {page} = value
    return <PiyachokFeedView page={page}/>
}

export default PiyachokPage
