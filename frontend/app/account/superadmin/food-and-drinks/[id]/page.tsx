import type {Metadata} from "next";
import {superadminFoodAndDrinkService} from "@/src/services/superadmin-food-and-drink.service";
import {notFound} from "next/navigation";
import {getAccessCookie} from "@/src/services/server.service";
import SuperadminFoodAndDrinkDetailsView from "@/src/components/views/superadmin/SuperadminFoodAndDrinkDetailsView";

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
    return <SuperadminFoodAndDrinkDetailsView id={id} search={search}/>
}

export default SuperadminFoodAndDrinkByIdPage;