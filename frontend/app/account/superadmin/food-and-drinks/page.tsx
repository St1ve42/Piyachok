import type {Metadata} from "next";
import SuperadminFoodAndDrinks from "@/src/components/features/superadmin/food-and-drinks/SuperadminFoodAndDrinks";
import {redirect} from "next/navigation";
import {superadminFoodAndDrinkService} from "@/src/services/superadmin-food-and-drink.service";
import { getAccessCookie } from "@/src/services/server.service";
import {
  queryFoodAndDrinkValidator,
} from "@/src/validators/food-and-drink/query-food-and-drink.validator";
import {IFoodAndDrinkQuery} from "@/src/interfaces/shared/IBaseQuery";

export const metadata: Metadata = {
    title: 'Усі заклади'
};

type PropsType = {
    searchParams: Promise<Record<'name' | 'sortBy' | 'page' | 'limit', string | undefined> & {sort: 'asc' | 'desc'}>
}

const SuperadminFoodAndDrinksPage = async ({searchParams}: PropsType) => {
    const awaitedSearchParams = await searchParams
    const {error, value} = queryFoodAndDrinkValidator.validate(awaitedSearchParams)
    const validatedQuery = value as IFoodAndDrinkQuery
    if(error){
        redirect('/account/superadmin/food-and-drinks')
    }
    const accessCookie = await getAccessCookie()
    const foodAndDrinkResponse = await superadminFoodAndDrinkService.find(validatedQuery, {headers: {'Cookie': accessCookie}})
    if(!foodAndDrinkResponse.success){
        return <div>{foodAndDrinkResponse.data.message}</div>
    }
    return <SuperadminFoodAndDrinks foodAndDrinkListData={foodAndDrinkResponse.data} page={validatedQuery.page ?? 1} accessCookie={accessCookie} limit={validatedQuery.limit ?? 20}/>
}

export default SuperadminFoodAndDrinksPage;