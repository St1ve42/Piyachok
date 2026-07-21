import FoodAndDrinkImages from "@/src/components/features/FoodAndDrinkImages";
import FoodAndDrinkSystemInfo from "@/src/components/features/food-and-drink/FoodAndDrinkSystemInfo";
import FoodAndDrinkInfo from "@/src/components/features/food-and-drink/FoodAndDrinkInfo";
import {IFoodAndDrinkSuperadminInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkSuperadminInfo";
import {FC} from "react";
import FoodAndDrinkSuperadminManageButtons from "@/src/components/features/food-and-drink/FoodAndDrinkSuperadminManageButtons";
import {IUser} from "@/src/interfaces/users/IUser";
import StatisticsView from "@/src/components/views/account/food-and-drink/StatisticsView";
import {Heading} from "@heroui/react";
import ShortOwnerInfo from "@/src/components/features/food-and-drink/ShortOwnerInfo";

type PropsType = {
    foodAndDrink: IFoodAndDrinkSuperadminInfo,
    users: IUser[]
}
const SuperadminFoodAndDrinkDetailsView: FC<PropsType> = ({foodAndDrink, users}) => {
    const {images, id, owner} = foodAndDrink
    return (
        <div className="flex flex-col gap-3 mb-2">
            <div className="flex justify-between">
                <ShortOwnerInfo owner={owner}/>
                <FoodAndDrinkSuperadminManageButtons foodAndDrink={foodAndDrink} users={users}/>
            </div>
            <FoodAndDrinkImages images={images}/>
            <FoodAndDrinkSystemInfo foodAndDrink={foodAndDrink}/>
            <FoodAndDrinkInfo foodAndDrink={foodAndDrink}/>
            <Heading level={3} className="text-center">Статистика</Heading>
            <StatisticsView id={id}/>
        </div>
    )
}

export default SuperadminFoodAndDrinkDetailsView