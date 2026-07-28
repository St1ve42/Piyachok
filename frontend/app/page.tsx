import HomeView from "@/src/components/views/HomeView";
import { queryFoodAndDrinkValidator } from "@/src/validators/food-and-drink/query-food-and-drink.validator";
import { redirect } from "next/navigation";

type PropsType = {
    searchParams: Promise<Record<'page' | 'name' | 'type' | 'rating' | 'averageReceipt[gte]' | 'averageReceipt[lte]' | 'sortBy', string | undefined> & {
        sort: 'asc' | 'desc'
    } & {'features[]': string | string[]}>
}

export default async function HomePage({searchParams}: PropsType) {
    const awaitedSearchParams = await searchParams
    const {error, value} = queryFoodAndDrinkValidator.validate(awaitedSearchParams)
    console.log(error)
    if(error){
      redirect('/')
    }
    return <HomeView searchParams={value}/>;
}