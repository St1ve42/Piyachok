'use client'
import {useState} from "react";
import { Button, CloseButtonRoot } from "@heroui/react";
import {Funnel} from "@gravity-ui/icons";
import FoodAndDrinkFiltration from "@/src/components/features/food-and-drink/filtration/FoodAndDrinkFiltration";

const FiltrationSidebar = () => {
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false)
    return (
        <div className="lg:hidden">
            <Button onClick={() => setIsOpenSidebar(true)}><Funnel/></Button>
            {isOpenSidebar && <div className="fixed bg-black/50 h-full w-full z-[10] top-0 left-0">
                <div className="w-[70%] flex flex-col items-center bg-white h-full">
                    <CloseButtonRoot className="self-end mr-2" onClick={() => setIsOpenSidebar(false)}/>
                    <div className="w-[70%]">
                        <FoodAndDrinkFiltration/>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default FiltrationSidebar