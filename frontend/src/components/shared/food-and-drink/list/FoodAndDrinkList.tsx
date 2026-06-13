import FoodAndDrinkCard from "@/src/components/shared/food-and-drink/card/FoodAndDrinkCard";
import {IFoodAndDrinkOneFromList} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOneFromList";
import {FC} from "react";
import {UrlObject} from "node:url";
import NoResults from "@/src/components/ui/no-results/NoResults";

type PropsType = {
    foodAndDrinkList: IFoodAndDrinkOneFromList[]
    href: string | UrlObject
    isDecision?: boolean
}

const FoodAndDrinkList: FC<PropsType> = ({foodAndDrinkList, href, isDecision = false}) => {
    return (foodAndDrinkList.length !== 0 ?
        (<div className="grid grid-cols-3 w-full gap-3">{foodAndDrinkList.map(foodAndDrink =>
            <FoodAndDrinkCard foodAndDrinkOneFromList={foodAndDrink} isDecision={isDecision} id={foodAndDrink.id} key={foodAndDrink.id} href={href}/>
        )}
        </div>)
        :
        <NoResults/>)
}

export default FoodAndDrinkList