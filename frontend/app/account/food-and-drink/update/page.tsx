import type {Metadata} from "next";
import {FC} from "react";

export const metadata: Metadata = {
    title: 'Оновлення закладу'
};

type Props = {
    params: Promise<unknown>,
    searchParams: Promise<unknown>
}

const UpdateFoodAndDrinkPage: FC<Props> = async () => {
    return (
        <div>
            Component
        </div>
    );
}

export default UpdateFoodAndDrinkPage;