import FoodAndDrink from "@/src/components/shared/food-and-drink/FoodAndDrink";
import { IFoodAndDrink } from "@/src/interfaces/food-and-drink/IFoodAndDrink";
import { FC } from "react";

type PropsType = {
  foodAndDrink: IFoodAndDrink
}

const FoodAndDrinkByID: FC<PropsType> = ({foodAndDrink}) => {
  return <div className="flex justify-center">
    <div className="w-[90%]">
      <FoodAndDrink foodAndDrink={foodAndDrink} mode={'user'}/>
    </div>
  </div>
};

export default FoodAndDrinkByID;
