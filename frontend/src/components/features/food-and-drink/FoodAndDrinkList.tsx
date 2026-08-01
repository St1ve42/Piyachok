import FoodAndDrinkCard from "@/src/components/features/food-and-drink/FoodAndDrinkCard";
import {IFoodAndDrinkOneFromList} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOneFromList";
import {FC} from "react";
import {UrlObject} from "node:url";
import NoResults from "@/src/components/shared/ui/NoResults";

type PropsType = {
    foodAndDrinkList: IFoodAndDrinkOneFromList[]
    href: string | UrlObject
    mode: 'default' | 'moderate' | 'favourite' | 'all'
}

const FoodAndDrinkList: FC<PropsType> = ({foodAndDrinkList, href, mode}) => {
    return (foodAndDrinkList.length !== 0 ?
        (<div className="grid grid-cols-3 w-full gap-3 mb-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-md:w-full">{foodAndDrinkList.map(foodAndDrink =>
            <FoodAndDrinkCard foodAndDrinkOneFromList={foodAndDrink} mode={mode} id={foodAndDrink.id} key={foodAndDrink.id} href={href}/>
        )}
        </div>)
        :
        (mode === 'favourite' ? <div className="mt-10">
            <NoResults text={'Почніть додавати заклади в улюблені!'} isButtonClearFilters={false}/>
        </div> : <NoResults isButtonClearFilters={mode === 'all'} queryNamesToRemove={mode === 'all' ? ['status'] : undefined}/>))
}

export default FoodAndDrinkList