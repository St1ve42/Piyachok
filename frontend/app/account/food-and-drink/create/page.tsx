import type {Metadata} from "next";
import CreateOrUpdateFoodAndDrink from "@/src/components/views/account/create-or-update/CreateOrUpdateFoodAndDrink";

export const metadata: Metadata = {
    title: 'Створення закладу'
};

const CreateFoodAndDrinkPage = async () => {
    return <CreateOrUpdateFoodAndDrink mode={'create'}/>
}

export default CreateFoodAndDrinkPage;