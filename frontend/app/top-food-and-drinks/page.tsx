import type {Metadata} from "next";
import TopFoodAndDrinkView from "@/src/components/views/TopFoodAndDrinkView";
import { FC } from "react";
import {
  basePaginationValidator,
} from "@/src/validators/shared/base.pagination.schema";
import { ValidationError } from "joi";
import {redirect} from "next/navigation";
import {IBaseQuery} from "@/src/interfaces/shared/IBaseQuery";

export const metadata: Metadata = {
    title: 'Топ закладів'
};

type PropsType = {
    searchParams: Promise<{page?: number}>
}

const TopFoodAndDrinkPage: FC<PropsType> = async ({searchParams}) => {
    const awaitedSearchParams = await searchParams
    const {error, value}: {error?: ValidationError, value: IBaseQuery} = basePaginationValidator.validate(awaitedSearchParams)
    if(error){
        redirect('/top-food-and-drinks')
    }
    const {page} = value
    return <TopFoodAndDrinkView page={page as number}/>
}

export default TopFoodAndDrinkPage

