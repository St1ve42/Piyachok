import FoodAndDrinkCard from "@/src/components/features/food-and-drink/FoodAndDrinkCard";
import {IFoodAndDrinkOneFromList} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOneFromList";
import {FC} from "react";
import {UrlObject} from "node:url";
import NoResults from "@/src/components/shared/ui/NoResults";

type PropsType = {
    foodAndDrinkList: IFoodAndDrinkOneFromList[]
    href: string | UrlObject
    mode: 'default' | 'moderate' | 'favourite'
}

const FoodAndDrinkList: FC<PropsType> = ({foodAndDrinkList, href, mode}) => {
    return (foodAndDrinkList.length !== 0 ?
        (<div className="grid grid-cols-3 w-full gap-3 mb-3">{foodAndDrinkList.map(foodAndDrink =>
            <FoodAndDrinkCard foodAndDrinkOneFromList={foodAndDrink} mode={mode} id={foodAndDrink.id} key={foodAndDrink.id} href={href}/>
        )}
        </div>)
        :
        (mode === 'favourite' ? <div className="mt-10">
            <NoResults text={'Почніть додавати заклади в улюблені!'}/>
        </div> : <NoResults/>))
}

export default FoodAndDrinkList