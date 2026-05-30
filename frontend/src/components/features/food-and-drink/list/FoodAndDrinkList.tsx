import FoodAndDrinkCard from "@/src/components/features/food-and-drink/card/FoodAndDrinkCard";
import {IFoodAndDrinkOneFromList} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOneFromList";
import {FC} from "react";
import {UrlObject} from "node:url";
import {Heading} from "@heroui/react";
import Image from "next/image";
import PageNotFound from "@/src/public/no-results.png";

type PropsType = {
    foodAndDrinkList: IFoodAndDrinkOneFromList[]
    href: string | UrlObject
    isPrivate?: boolean
}

const FoodAndDrinkList: FC<PropsType> = ({foodAndDrinkList, href, isPrivate = false}) => {
    return (foodAndDrinkList.length !== 0 ?
        (<div className="grid grid-cols-3 w-full gap-3">{foodAndDrinkList.map(foodAndDrink =>
            <FoodAndDrinkCard foodAndDrinkOneFromList={foodAndDrink} isPrivate={isPrivate} id={foodAndDrink.id} key={foodAndDrink.id} href={href}/>
        )}
        </div>)
        :
        <div className="h-[60%] flex justify-center items-center">
            <div className="w-[60%] flex flex-col items-center gap-2">
                <Image src={PageNotFound} width={100} height={100} alt={'Не знайдено'}/>
                <Heading level={3}>Схоже, ми поки нічого не знайшли...</Heading>
                <div className="text-center">
                    {isPrivate ? 'За Вашим запитом збігів немає. Спробуйте знайти щось інакше — це має допомогти!' : 'За Вашим запитом збігів немає. Спробуйте прибрати кілька фільтрів або знайти щось інакше — це має допомогти!'}
                </div>
            </div>
        </div>)
}

export default FoodAndDrinkList