import FoodAndDrink from "@/src/components/shared/food-and-drink/FoodAndDrink";
import { FC } from "react";
import {IFoodAndDrinkById} from "@/src/interfaces/food-and-drink/IFoodAndDrinkById";

type PropsType = {
  foodAndDrink: IFoodAndDrinkById
}

const FoodAndDrinkByID: FC<PropsType> = ({foodAndDrink}) => {
  return <div className="flex justify-center">
    <div className="w-[90%]">
      <FoodAndDrink foodAndDrink={foodAndDrink} mode={'user'}/>
    </div>
  </div>
};

export default FoodAndDrinkByID;
