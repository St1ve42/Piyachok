import type { Metadata } from "next";
import ConfirmFoodAndDrinkEmailView from "@/src/components/views/account/food-and-drink/ConfirmFoodAndDrinkEmailView";

export const metadata: Metadata = {
  title: "Підтвердження електронної пошти закладу",
};

type Props = {
  params: Promise<{token?: string}>;
};

const ConfirmFoodAndDrinkEmailPage = async ({ params }: Props) => {
    const {token} = await params
    return <ConfirmFoodAndDrinkEmailView token={token}/>
};

export default ConfirmFoodAndDrinkEmailPage;
