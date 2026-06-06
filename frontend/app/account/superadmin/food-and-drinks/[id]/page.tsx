import type {Metadata} from "next";
import {superadminFoodAndDrinkService} from "@/src/services/superadmin-food-and-drink.service";
import {notFound} from "next/navigation";
import FoodAndDrink from "@/src/components/features/account/food-and-drink/my-food-and-drink/FoodAndDrink";
import {getAccessCookie} from "@/src/services/server.service";

export const metadata: Metadata = {
    title: 'Заклад з айді'
};

type Props = {
    params: Promise<Record<'id', string | undefined>>,
}

const SuperadminFoodAndDrinkByIdPage = async ({params}: Props) => {
    const {id} = await params
    if(!id){
        notFound()
    }
    const accessToken = await getAccessCookie()
    const foodAndDrinkResponse = await superadminFoodAndDrinkService.findById(id, {headers: {'Cookie': accessToken}})
    if(!foodAndDrinkResponse.success && foodAndDrinkResponse.status === 404){
        notFound()
    }
    else if(!foodAndDrinkResponse.success){
        return <div>{foodAndDrinkResponse.data.message}</div>
    }
    return <FoodAndDrink foodAndDrink={foodAndDrinkResponse.data} isPublic={false}/>
}

export default SuperadminFoodAndDrinkByIdPage;