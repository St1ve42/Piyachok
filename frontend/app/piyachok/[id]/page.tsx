import type { Metadata } from "next";
import {notFound, redirect} from "next/navigation";
import {piyachokService} from "@/src/services/piyachok.service";
import {IPiyachokDetail} from "@/src/interfaces/piyachok/IPiyachokDetail";
import PiyachokDetailView from "@/src/components/views/PiyachokDetailView";
import {basePaginationValidator} from "@/src/validators/shared/base.pagination.schema";
import {ValidationError} from "joi";

export const getPiyachok = async(params: Promise<{id?: string}>): Promise<IPiyachokDetail> => {
    const {id} = await params
    if(!id){
        notFound()
    }
    const { success, data } = await piyachokService.findById(id);
    if(!success){
        notFound()
    }
    return data
}

export const metadata: Metadata = {
    title: "Пиячок",
};

type Props = {
    params: Promise<{ id?: string }>;
    searchParams: Promise<{ page?: number}>
};

const PiyachokDetailPage = async ({ params, searchParams }: Props) => {
    const piyachok = await getPiyachok(params)
    const awaitedSearchParams = await searchParams
    const {error, value: {page}}: {error?: ValidationError, value: {page: number, limit: number}} = basePaginationValidator.validate(awaitedSearchParams)
    if(error){
        redirect(`/piyachok/${piyachok.id}`)
    }
    return <PiyachokDetailView piyachok={piyachok} page={page}/>
};

export default PiyachokDetailPage;
