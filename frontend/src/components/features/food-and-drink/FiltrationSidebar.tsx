'use client'
import { FC, useState } from "react";
import { Button, CloseButtonRoot } from "@heroui/react";
import {Funnel} from "@gravity-ui/icons";
import FoodAndDrinkFiltration from "@/src/components/features/food-and-drink/filtration/FoodAndDrinkFiltration";

export type PropsType = {
    initialTypeValue?: string,
    initialFeatures?: string[] | string,
    initialRating?: number,
    initialAverageReceipt?: number[]
}

const FiltrationSidebar: FC<PropsType> = (props) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false)
    return (
        <div className="lg:hidden">
            <Button onClick={() => setIsOpenSidebar(true)}><Funnel/></Button>
            {isOpenSidebar && <div className="fixed h-full w-full z-[10] top-0 left-0">
                <div className="bg-black/50 h-full w-full z-[12] top-0 left-0" onClick={() => setIsOpenSidebar(false)}/>
                <div className="w-[70%] absolute flex flex-col items-center bg-white h-full top-0 left-0">
                    <CloseButtonRoot className="self-end mr-2" onClick={() => setIsOpenSidebar(false)}/>
                    <div className="w-[70%]">
                        <FoodAndDrinkFiltration {...props}/>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default FiltrationSidebar