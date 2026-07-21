import type { Metadata } from "next";
import ConfirmRequestFoodAndDrinkEmailView from "@/src/components/views/account/food-and-drink/ConfirmRequestFoodAndDrinkEmailView";
import {getUserFromHeaders} from "@/src/services/server.service";
import {notFound} from "next/navigation";

export const metadata: Metadata = {
  title: "Підтвердження електронної пошти закладу",
};

const ConfirmRequestFoodAndDrinkEmailPage = async () => {
    const { ownerOf } = await getUserFromHeaders();
    if(!ownerOf){
        notFound()
    }
    return <ConfirmRequestFoodAndDrinkEmailView/>;
};

export default ConfirmRequestFoodAndDrinkEmailPage;
