import type { Metadata } from "next";
import ConfirmRequestFoodAndDrinkEmail from "@/src/components/views/account/ConfirmRequestFoodAndDrinkEmail";

export const metadata: Metadata = {
  title: "Підтвердження електронної пошти закладу",
};

const ConfirmRequestFoodAndDrinkEmailPage = async () => {
    return <ConfirmRequestFoodAndDrinkEmail/>;
};

export default ConfirmRequestFoodAndDrinkEmailPage;
