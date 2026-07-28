'use client'
import { Button, toast } from "@heroui/react";
import {Plus} from "@gravity-ui/icons";
import { FC, RefObject } from "react";
import {topCategoryService} from "@/src/services/top-category.service";

type PropsType = {
    foodAndDrinkId: string,
    categoryId: string,
    closeTriggerButton: RefObject<HTMLButtonElement | null>
}

const AddFoodAndDrinkButton: FC<PropsType> = ({categoryId, foodAndDrinkId, closeTriggerButton}) => {
    const addFoodAndDrink = async () => {
        const addFoodAndDrinkResponse =
          await topCategoryService.addFoodAndDrink(categoryId, {
            foodAndDrinkId,
          });
        if(!addFoodAndDrinkResponse.success){
            toast.danger(addFoodAndDrinkResponse.data.message)
            return
        }
        if(closeTriggerButton.current){
            closeTriggerButton.current.click()
        }
        toast.success('Успішно додано заклад до топ категорії')
    }
    return (
        <Button onClick={addFoodAndDrink}>
            <Plus/>
        </Button>
    )
}

export default AddFoodAndDrinkButton