'use client'
import { FC, useState } from "react";
import {Heart, HeartFill} from "@gravity-ui/icons";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import {updateTagAction} from "@/src/actions/server.actions";

type PropsType = {
    foodAndDrinkId: string
}

const TemporaryFavourite: FC<PropsType> = ({foodAndDrinkId}) => {
    const [isFavourite, setIsFavourite] = useState(true)
    const handleFavourite = async () => {
        await foodAndDrinkService.toggleFavourite(foodAndDrinkId)
        setIsFavourite((value) => !value)
        await updateTagAction('food-and-drink-by-id')
    }
    return <div onClick={handleFavourite} className="self-end cursor-pointer">{isFavourite ? <HeartFill/> : <Heart/>}</div>;
};

export default TemporaryFavourite;
