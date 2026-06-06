import type {Metadata} from "next";
import CreateFoodAndDrink from "@/src/components/features/account/food-and-drink/create/CreateFoodAndDrink";

export const metadata: Metadata = {
    title: 'Створення закладу'
};

const CreateFoodAndDrinkPage = async () => {
    return <CreateFoodAndDrink/>
}

export default CreateFoodAndDrinkPage;