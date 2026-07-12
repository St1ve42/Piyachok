import type { Metadata } from "next";
import ConfirmFoodAndDrinkEmail from "@/src/components/views/account/ConfirmFoodAndDrinkEmail";

export const metadata: Metadata = {
  title: "Підтвердження електронної пошти закладу",
};

type Props = {
  params: Promise<{token?: string}>;
};

const ConfirmFoodAndDrinkEmailPage = async ({ params }: Props) => {
    const {token} = await params
    return <ConfirmFoodAndDrinkEmail token={token}/>
};

export default ConfirmFoodAndDrinkEmailPage;
