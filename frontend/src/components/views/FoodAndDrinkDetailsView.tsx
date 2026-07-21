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
import FoodAndDrinkImages from "@/src/components/features/FoodAndDrinkImages";
import FoodAndDrinkInfo from "@/src/components/features/food-and-drink/FoodAndDrinkInfo";
import TotalStatistics from "@/src/components/features/food-and-drink/TotalStatistics";
import FoodAndDrinkNews from "@/src/components/features/news/FoodAndDrinkNews";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import {GlobalUserRoleEnum} from "@/src/enums/user/global.user.role.enum";

type PropsType = {
    foodAndDrink: IFoodAndDrinkById,
    searchParams: Record<'rating', number | undefined> & {sortBy?: ReviewSortByEnum, sort?: SortEnum, page: number}
}

const FoodAndDrinkDetailsView: FC<PropsType> = async ({foodAndDrink, searchParams}) => {
    const {
        id,
        region,
        city,
        rating,
        isOwner,
        images,
        isFavourite,
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
    const hasRightToManageResource = isOwner || user?.role === GlobalUserRoleEnum.SUPERADMIN
    const newsResponse = await foodAndDrinkService.findNews(id, {category: undefined, limit: 20})
    return <section className="px-8 flex justify-center gap-5">
    <div className="grid grid-cols-100 grid-rows-[25rem_auto] gap-3">
        <div className="flex flex-col gap-3 col-span-64">
            <div>
                <FoodAndDrinkImages images={images}/>
            </div>
            <div className="relative">
                <FoodAndDrinkInfo foodAndDrink={foodAndDrink}/>
                <div className="absolute top-[15px] right-[15px] flex gap-4 items-center">
                    <TotalStatistics foodAndDrinkId={id} isFavourite={isFavourite}/>
                    <FoodAndDrinkContact foodAndDrinkId={id} user={user}/>
                </div>
            </div>
            <FoodAndDrinkNews newsResponse={newsResponse} hasRightToManageNews={hasRightToManageResource}/>
            <FoodAndDrinkCommentsBlock photo={user?.photo ?? null} isLogged={isLogged} foodAndDrinkId={id} user={user} isOwner={isOwner}/>
        </div>
        <div className="flex flex-col gap-4 mb-2 col-span-36">
            <div className="h-[25rem] w-full flex-shrink-0">
                <MapWrapper foodAndDrinkPosition={centerPosition} foodAndDrinkLocationInfo={{region, city}}/>
            </div>
            <div className="flex flex-col gap-2">
                <RatingStatistics foodAndDrinkId={id} rating={rating}/>
                <ReviewForm isLogged={isLogged} foodAndDrinkId={id} isOwner={isOwner}/>
            </div>
            <Reviews searchParams={searchParams} foodAndDrinkId={id} user={user} isOwner={isOwner}/>
        </div>
    </div>
    </section>
};

export default FoodAndDrinkDetailsView;
