import {IFoodAndDrinkOwnerInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOwnerInfo";
import {FC} from "react";
import FoodAndDrinkImages from "@/src/components/features/FoodAndDrinkImages";
import FoodAndDrinkInfo from "@/src/components/features/food-and-drink/FoodAndDrinkInfo";
import FoodAndDrinkOwnerManageButtons from "@/src/components/features/food-and-drink/FoodAndDrinkOwnerManageButtons";
import FoodAndDrinkSystemInfo from "@/src/components/features/food-and-drink/FoodAndDrinkSystemInfo";

type PropsType = {
    foodAndDrink: IFoodAndDrinkOwnerInfo
}

const MyFoodAndDrink: FC<PropsType> = ({foodAndDrink}) => {
    const {images} = foodAndDrink
    return (
        <div className="flex flex-col gap-3 mb-2">
            <div className="self-end">
                <FoodAndDrinkOwnerManageButtons foodAndDrink={foodAndDrink}/>
            </div>
            <FoodAndDrinkImages images={images}/>
            <FoodAndDrinkSystemInfo foodAndDrink={foodAndDrink}/>
            <FoodAndDrinkInfo foodAndDrink={foodAndDrink}/>
        </div>
    )
}

export default MyFoodAndDrink