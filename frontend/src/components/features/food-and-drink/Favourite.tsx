'use client'
import { FC, useState} from "react";
import {Heart, HeartFill} from "@gravity-ui/icons";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import {updateTagAction} from "@/src/actions/server.actions";
import {redirect} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";

type PropsType = {
    foodAndDrinkId: string
    isFavourite: boolean | null
}

const Favourite: FC<PropsType> = ({foodAndDrinkId, isFavourite}) => {
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleToggleFavourite = async () => {
        setIsLoading(true)
        const response = await foodAndDrinkService.toggleFavourite(foodAndDrinkId)
        if(!response.success && response.status === 401){
            redirect('/auth/sign-in')
        }
        if(!response.success){
            return
        }
        await Promise.all([updateTagAction(`food-and-drink-by-id-${foodAndDrinkId}`), queryClient.invalidateQueries({queryKey: ['total statistics']})])
        await updateTagAction('my-favourite-food-and-drinks')
        setIsLoading(false)
    }
    return <button onClick={handleToggleFavourite} className="cursor-pointer" disabled={isLoading}>{isFavourite ? <HeartFill className="text-red-600"/> : <Heart/>}</button>;
};

export default Favourite;
