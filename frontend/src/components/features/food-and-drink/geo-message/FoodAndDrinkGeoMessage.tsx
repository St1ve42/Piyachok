'use client'

import {useErrorStore} from "@/src/store/useSharedStore";
import {FC} from "react";

type PropsType = {
    sortBy: string | undefined
}

const FoodAndDrinkGeoMessage: FC<PropsType> = ({sortBy}) => {
    const {error} = useErrorStore()
    if(error){
        return <div>Не вдалось визначити Ваше місцеположення. Будь ласка, увімкніть геолокацію.</div>
    }
    if(sortBy === 'distance'){
        return <div>На основі вашого місцеположення</div>
    }
    return (
        <div>

        </div>
    )
}

export default FoodAndDrinkGeoMessage