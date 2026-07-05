'use client'

import {Rating} from "react-simple-star-rating";
import {FC} from "react";

type PropsType = {
    handleStarClick?: ((value: number) => void),
    value: number
}

const InteractiveStartRating: FC<PropsType> = ({handleStarClick, value}) => {
    return <Rating initialValue={value} iconsCount={5} size={20} className="mb-1" onClick={handleStarClick}/>
}

export default InteractiveStartRating