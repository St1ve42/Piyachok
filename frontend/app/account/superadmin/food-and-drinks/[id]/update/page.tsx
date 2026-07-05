import type {Metadata} from "next";
import {superadminFoodAndDrinkService} from "@/src/services/superadmin-food-and-drink.service";
import {notFound} from "next/navigation";
import {getAccessCookie} from "@/src/services/server.service";
import CreateOrUpdateFoodAndDrink from "@/src/components/views/account/create-or-update/CreateOrUpdateFoodAndDrink";

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
    title: foodAndDrinkResponse.success ? `Оновлення закладу ${foodAndDrinkResponse.data.name}` : 'Заклад',
  };
};

type Props = {
    params: Promise<Record<'id', string | undefined>>,
}

const SuperadminFoodAndDrinkUpdatePage = async ({params}: Props) => {
    const {id} = await params
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
    return <CreateOrUpdateFoodAndDrink foodAndDrink={foodAndDrinkResponse.data} mode={'update'} urlToRedirect={`/account/superadmin/food-and-drinks/${id}`}/>
}

export default SuperadminFoodAndDrinkUpdatePage;