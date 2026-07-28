import type { Metadata } from "next";
import {IBaseQueryFromURL} from "@/src/interfaces/shared/IBaseQueryFromURL";
import {basePaginationValidator} from "@/src/validators/shared/base.pagination.schema";
import {notFound, redirect} from "next/navigation";
import {ValidationError} from "joi";
import {IBaseQuery} from "@/src/interfaces/shared/IBaseQuery";
import FoodAndDrinkByCategory from "@/src/components/views/superadmin/FoodAndDrinkByCategory";

export const metadata: Metadata = {
    title: "Заклади за категорією ",
};

type Props = {
    params: Promise<{ id?: string }>;
    searchParams: Promise<IBaseQueryFromURL>;
};

const FoodAndDrinksByCategory = async ({ params, searchParams }: Props) => {
    const {id} = await params
    if(!id){
        notFound()
    }
    const awaitedSearchParams = await searchParams
    const {error, value}: {error?: ValidationError, value: IBaseQuery} = basePaginationValidator.validate(awaitedSearchParams)
    if(error){
        redirect(`/account/superadmin/top-categories/${id}/food-and-drinks`)
    }
    return <FoodAndDrinkByCategory id={id} query={value}/>
};

export default FoodAndDrinksByCategory;
