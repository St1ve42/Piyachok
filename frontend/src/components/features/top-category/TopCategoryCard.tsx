import {ITopCategory} from "@/src/interfaces/top-category/ITopCategory";
import { FC, RefObject } from "react";
import {Card} from "@heroui/react";
import Link from "next/link";
import TopCategoryDropdown from "@/src/components/features/top-category/TopCategoryDropdown";
import AddFoodAndDrinkButton from "@/src/components/features/top-category/AddFoodAndDrinkButton";

type PropsType = {
    topCategory: ITopCategory,
    mode?: 'default' | 'add-food-and-drink',
    foodAndDrinkId?: string,
    closeTriggerButton?: RefObject<HTMLButtonElement | null>
}

const TopCategoryCard: FC<PropsType> = ({topCategory, mode = 'default', foodAndDrinkId, closeTriggerButton}) => {
    const {id, name} = topCategory
    return (
        <Card>
            <Card.Content>
                <Link href={`/account/superadmin/top-categories/${id}/food-and-drinks`}>{name}</Link>
            </Card.Content>
            <div className="absolute top-2 right-2">
                {mode === 'default' && <TopCategoryDropdown topCategory={topCategory}/>}
                {mode === 'add-food-and-drink' && foodAndDrinkId && closeTriggerButton && <AddFoodAndDrinkButton foodAndDrinkId={foodAndDrinkId} categoryId={id} closeTriggerButton={closeTriggerButton}/>}
            </div>
        </Card>
    )
}

export default TopCategoryCard