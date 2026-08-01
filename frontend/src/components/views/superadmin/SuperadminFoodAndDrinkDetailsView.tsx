import FoodAndDrinkImages from "@/src/components/features/FoodAndDrinkImages";
import FoodAndDrinkSystemInfo from "@/src/components/features/food-and-drink/FoodAndDrinkSystemInfo";
import FoodAndDrinkInfo from "@/src/components/features/food-and-drink/FoodAndDrinkInfo";
import {FC} from "react";
import FoodAndDrinkSuperadminManageButtons from "@/src/components/features/food-and-drink/FoodAndDrinkSuperadminManageButtons";
import StatisticsView from "@/src/components/views/account/food-and-drink/StatisticsView";
import {Heading} from "@heroui/react";
import ShortOwnerInfo from "@/src/components/features/food-and-drink/ShortOwnerInfo";
import {getAccessCookie} from "@/src/services/server.service";
import {superadminFoodAndDrinkService} from "@/src/services/superadmin-food-and-drink.service";
import {notFound} from "next/navigation";
import {superadminUsersService} from "@/src/services/superadmin-users.service";
import {GlobalUserRoleEnum} from "@/src/enums/user/global.user.role.enum";
import {topCategoryService} from "@/src/services/top-category.service";

type PropsType = {
    id: string,
    search?: string
}
const SuperadminFoodAndDrinkDetailsView: FC<PropsType> = async ({id, search}) => {
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
    const topCategoriesResponse = await topCategoryService.find(accessToken)
    if(!topCategoriesResponse.success){
        return <div>{topCategoriesResponse.data.message}</div>
    }
    const foodAndDrink = foodAndDrinkResponse.data
    const users = usersResponse.data.data
    const topCategories = topCategoriesResponse.data.data
    const {images, id: foodAndDrinkId, owner} = foodAndDrink
    return (
        <div className="flex flex-col gap-3 max-sm:gap-2 mb-2">
            <div className="flex flex-col md:flex-row justify-between gap-3 max-sm:gap-2">
                <ShortOwnerInfo owner={owner}/>
                <FoodAndDrinkSuperadminManageButtons foodAndDrink={foodAndDrink} users={users} topCategories={topCategories}/>
            </div>
            <FoodAndDrinkImages images={images}/>
            <FoodAndDrinkSystemInfo foodAndDrink={foodAndDrink}/>
            <FoodAndDrinkInfo foodAndDrink={foodAndDrink}/>
            <Heading level={3} className="text-center max-sm:text-lg">Статистика</Heading>
            <StatisticsView id={foodAndDrinkId}/>
        </div>
    )
}

export default SuperadminFoodAndDrinkDetailsView