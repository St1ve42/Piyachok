import FoodAndDrink from "@/src/components/features/food-and-drink/food-and-drink-info/FoodAndDrink";
import { FC } from "react";
import {IFoodAndDrinkById} from "@/src/interfaces/food-and-drink/IFoodAndDrinkById";
import MapWrapper from "@/src/components/features/food-and-drink/MapWrapper";
import RatingStatistics from "@/src/components/features/reviews/RatingStatistics";
import Reviews from "@/src/components/features/reviews/Reviews";
import ReviewForm from "@/src/components/features/reviews/ReviewForm";
import {cookies} from "next/headers";
import {userService} from "@/src/services/users.service";
import {IUser} from "@/src/interfaces/users/IUser";
import {ReviewSortByEnum} from "@/src/enums/ReviewSortByEnum";
import {SortEnum} from "@/src/enums/shared/SortEnum";
import FoodAndDrinkCommentsBlock from "@/src/components/features/comments/FoodAndDrinkCommentsBlock";
import FoodAndDrinkContact from "@/src/components/features/food-and-drink/contact/FoodAndDrinkContact";

type PropsType = {
    foodAndDrink: IFoodAndDrinkById,
    searchParams: Record<'rating', number | undefined> & {sortBy?: ReviewSortByEnum, sort?: SortEnum, page: number}
}

const FoodAndDrinkByID: FC<PropsType> = async ({foodAndDrink, searchParams}) => {
    const {
        id,
        region,
        city,
        rating,
        isOwner,
      location: {
        coordinates: { lat, lng },
      },
    } = foodAndDrink;
    const centerPosition: [number, number] = [lat, lng]
    let isLogged: boolean = false
    let user: IUser | null = null
    const cookieStore = await cookies()
    const accessTokenCookie = cookieStore.get('accessToken')
    if(accessTokenCookie){
        const {data, success} = await userService.me({headers: {'Cookie': `${accessTokenCookie.name}=${accessTokenCookie.value}`}})
        if(success){
            isLogged = true
            user = data
        }
    }
    return <section className="px-8 flex justify-center gap-5">
    <div className="flex flex-col w-[64%]">
        <FoodAndDrink foodAndDrink={foodAndDrink} mode={'user'}/>
        <FoodAndDrinkCommentsBlock photo={user?.photo ?? null} isLogged={isLogged} foodAndDrinkId={id} user={user} isOwner={isOwner}/>
    </div>
    <div className="flex flex-col w-[36%] gap-4 mb-2">
        <div className="h-[25rem] w-full flex-shrink-0 mt-2">
            <MapWrapper foodAndDrinkPosition={centerPosition} foodAndDrinkLocationInfo={{region, city}}/>
        </div>
        <div className="flex flex-col gap-2">
            <FoodAndDrinkContact foodAndDrinkId={id} user={user}/>
            <RatingStatistics foodAndDrinkId={id} rating={rating}/>
            <ReviewForm isLogged={isLogged} foodAndDrinkId={id} isOwner={isOwner}/>
        </div>
        <Reviews searchParams={searchParams} foodAndDrinkId={id} user={user} isOwner={isOwner}/>
    </div>
    </section>
};

export default FoodAndDrinkByID;
