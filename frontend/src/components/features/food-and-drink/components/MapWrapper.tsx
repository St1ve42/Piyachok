'use client'
import dynamic from "next/dynamic";
import { FC } from "react";

const Map = dynamic(() => import("@/src/components/features/food-and-drink/components/Map"), {
    ssr: false,
    loading: () => <div className="h-[25rem] w-[32%] flex-shrink-0 bg-gray-200 animate-pulse"></div>,
});

type PropsType = {
    foodAndDrinkPosition: [number, number],
    foodAndDrinkLocationInfo: { region: string; city: string }
}

const MapWrapper: FC<PropsType> = ({foodAndDrinkPosition, foodAndDrinkLocationInfo}) => {
    return <Map foodAndDrinkPosition={foodAndDrinkPosition} foodAndDrinkLocationInfo={foodAndDrinkLocationInfo} />;
};

export default MapWrapper;