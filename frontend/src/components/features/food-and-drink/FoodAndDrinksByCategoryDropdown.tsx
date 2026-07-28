'use client'
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownPopover, toast} from "@heroui/react";
import {EllipsisVertical, TrashBin} from "@gravity-ui/icons";
import {topCategoryService} from "@/src/services/top-category.service";
import {FC} from "react";
import {updateTagAction} from "@/src/actions/server.actions";

type PropsType = {
    categoryId: string,
    foodAndDrinkId: string
}

const FoodAndDrinksByCategoryDropdown: FC<PropsType> = ({categoryId, foodAndDrinkId}) => {
    const handleDeleteFromCategory = async () => {
        const response = await topCategoryService.removeFoodAndDrink(categoryId, {foodAndDrinkId})
        if(!response.success){
            toast.danger(response.data.message)
        }
        await updateTagAction(`all-food-and-drinks-by-category-${categoryId}`)
    }
    return (
        <Dropdown>
            <Button variant={'secondary'}><EllipsisVertical/></Button>
            <DropdownPopover>
                <DropdownMenu>
                    <DropdownItem className="text-red-600" onClick={handleDeleteFromCategory}><TrashBin/>Видалити з категорії</DropdownItem>
                </DropdownMenu>
            </DropdownPopover>
        </Dropdown>
    )
}

export default FoodAndDrinksByCategoryDropdown