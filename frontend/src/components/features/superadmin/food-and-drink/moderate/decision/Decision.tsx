'use client'
import {Check, Xmark} from "@gravity-ui/icons";
import {FC, MouseEventHandler, useState} from "react";
import {superadminFoodAndDrinkService} from "@/src/services/superadmin-food-and-drink.service";
import {FoodAndDrinkStatusEnum} from "@/src/enums/food-and-drink/food-and-drink-status.enum";
import {useRouter} from "next/navigation";

type PropsType = {
    id: string
}

const Decision: FC<PropsType> = ({id}) => {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const handleAccept: MouseEventHandler<SVGSVGElement> = async () => {
        const response = await superadminFoodAndDrinkService.setStatus(id, FoodAndDrinkStatusEnum.ACTIVE);
        if(!response.success){
            setErrorMessage(response.data.message)
        }
        else{
            router.refresh()
        }
    }
    const handleReject: MouseEventHandler<SVGSVGElement> = async () => {
        const response = await superadminFoodAndDrinkService.setStatus(id, FoodAndDrinkStatusEnum.INACTIVE)
        if(!response.success){
            setErrorMessage(response.data.message)
        }
        else{
            router.refresh()
        }
    }
    return <div className="flex self-end gap-4"><Check onClick={handleAccept} className="cursor-pointer rounded-full transition-all duration-300 hover:shadow-[inset_0_0_0_2px_rgba(59,130,246,0.2)]"/><Xmark onClick={handleReject} className="cursor-pointer rounded-full transition-all duration-300 hover:shadow-[inset_0_0_0_2px_rgba(59,130,246,0.2)]"/></div>

}

export default Decision