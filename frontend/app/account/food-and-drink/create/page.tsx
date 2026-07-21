import type {Metadata} from "next";
import FoodAndDrinkCreatingOrUpdatingView from "@/src/components/views/account/food-and-drink/create-or-update/FoodAndDrinkCreatingOrUpdatingView";
import {getUserFromHeaders} from "@/src/services/server.service";

export const metadata: Metadata = {
    title: 'Створення закладу'
};

const CreateFoodAndDrinkPage = async () => {
    const { ownerOf } = await getUserFromHeaders();
    if(ownerOf){
        return <div>Ви не можете створювати більше, ніж один заклад.</div>
    }
    return <FoodAndDrinkCreatingOrUpdatingView mode={'create'}/>
}

export default CreateFoodAndDrinkPage;