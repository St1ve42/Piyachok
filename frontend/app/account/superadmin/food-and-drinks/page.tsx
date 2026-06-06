import type {Metadata} from "next";
import SuperadminFoodAndDrinks from "@/src/components/features/superadmin/food-and-drinks/SuperadminFoodAndDrinks";
import {redirect} from "next/navigation";
import {superadminFoodAndDrinkService} from "@/src/services/superadmin-food-and-drink.service";
import {getAccessCookie} from "@/src/services/server.service";

export const metadata: Metadata = {
    title: 'Усі заклади'
};

type PropsType = {
    searchParams: Promise<Record<'name' | 'sortBy' | 'page' | 'limit', string | undefined> & {sort: 'asc' | 'desc'}>
}

const SuperadminFoodAndDrinksPage = async ({searchParams}: PropsType) => {
    let {page = 1, limit = 20, ...restSearchParams} = await searchParams
    page = Number(page)
    limit = Number(limit)
    if(page < 1 || isNaN(page) || limit < 1 || isNaN(limit)){
        redirect('/account/superadmin/food-and-drinks')
    }
    const accessCookie = await getAccessCookie()
    const foodAndDrinkResponse = await superadminFoodAndDrinkService.find({limit, page, ...restSearchParams}, {headers: {'Cookie': accessCookie}})
    if(!foodAndDrinkResponse.success){
        return <div>{foodAndDrinkResponse.data.message}</div>
    }
    return <SuperadminFoodAndDrinks foodAndDrinkListData={foodAndDrinkResponse.data} page={page} accessCookie={accessCookie} limit={limit}/>
}

export default SuperadminFoodAndDrinksPage;