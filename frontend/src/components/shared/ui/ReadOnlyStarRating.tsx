'use client'
import {Rating} from "react-simple-star-rating";
import {FC} from "react";

type PropsType = {
    initialValue: number;
    iconsCount?: number;
}

const ReadOnlyStarRating: FC<PropsType> = ({initialValue, iconsCount}) => {
  return <Rating readonly={true} initialValue={initialValue} allowFraction={true} iconsCount={iconsCount ?? 5} size={20} className="mb-1"/>
};

export default ReadOnlyStarRating;
