import type {Metadata} from "next";
import {superadminFoodAndDrinkService} from "@/src/services/superadmin-food-and-drink.service";
import {notFound} from "next/navigation";
import FoodAndDrink from "@/src/components/features/food-and-drink/food-and-drink-info/FoodAndDrink";
import {getAccessCookie} from "@/src/services/server.service";
import {superadminUsersService} from "@/src/services/superadmin-users.service";
import {GlobalUserRoleEnum} from "@/src/enums/user/global.user.role.enum";

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;
  if (!id) {
    notFound();
  }
  const accessToken = await getAccessCookie();
  const foodAndDrinkResponse = await superadminFoodAndDrinkService.findById(
    id,
    { headers: { Cookie: accessToken } },
  );
  return {
    title: foodAndDrinkResponse.success ? foodAndDrinkResponse.data.name : 'Заклад',
  };
};

type Props = {
    params: Promise<Record<'id', string | undefined>>,
    searchParams: Promise<Record<'search', string | undefined>>
}

const SuperadminFoodAndDrinkByIdPage = async ({params, searchParams}: Props) => {
    const {id} = await params
    const {search} = await searchParams
    if(!id){
        notFound()
    }
    const accessToken = await getAccessCookie()
    const foodAndDrinkResponse = await superadminFoodAndDrinkService.findById(id, {headers: {'Cookie': accessToken}})
    if(!foodAndDrinkResponse.success && (foodAndDrinkResponse.status === 404 || foodAndDrinkResponse.status === 400)){
        notFound()
    }
    else if(!foodAndDrinkResponse.success){
        return <div>{foodAndDrinkResponse.data.message}</div>
    }
    const usersResponse = await superadminUsersService.find({role: GlobalUserRoleEnum.USER, email: search}, {headers: {'Cookie': accessToken}})
    if(!usersResponse.success){
        return <div>{usersResponse.data.message}</div>
    }
    return <FoodAndDrink foodAndDrink={foodAndDrinkResponse.data} mode={'superadmin'} users={usersResponse.data.data}/>
}

export default SuperadminFoodAndDrinkByIdPage;