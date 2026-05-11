import {IFoodAndDrinkOneFromList} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOneFromList";
import Image from "next/image";
import noImage from "@/src/public/no-image-icon.jpg"
import wifi from "@/src/public/wifi-signalpng.png"
import livemusic from "@/src/public/live-music.png"
import parking from "@/src/public/parking.png"
import hours24_7 from "@/src/public/24_7.png"
import Feature from "@/src/components/features/food-and-drink/feature/Feature";
import {utils} from "@/src/utils/utils";
import {CardDescription, CardFooter, CardHeader, CardRoot, CardTitle} from "@heroui/react";



type PropsType = {
    foodAndDrinkOneFromList: IFoodAndDrinkOneFromList
}

export const FoodAndDrinkCard = ({foodAndDrinkOneFromList}: PropsType) => {
    const {name, type, location: {street}, city, features: {isWifi, isParking, isLiveMusic, is24hrs}, mainImage, distance} = foodAndDrinkOneFromList
    return (<CardRoot className="w-[300px]">
        {mainImage ? <Image src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${mainImage}`} alt={'Фото закладу'} width={300} height={50} className="rounded-sm"/> : <Image src={noImage} alt={'Зображення відсутнє'} width={200} height={20} className="w-full h-[26vh] rounded-sm border-black border-solid border-2"/>}
        <CardHeader>
            <CardTitle className="font-bold">
                {name}
            </CardTitle>
            <CardDescription>
                 <p>{utils.capitalizeFirstLetter(type)}</p>
                 <p>{street}, {city}{distance ? `, ${distance}` : ''}</p>
            </CardDescription>
        </CardHeader>
        <CardFooter className="gap-3 text-[12px]">
            {isWifi && <Feature image={wifi} alt={'WI-FI'} featureName={'WI-FI'}/>}
            {isParking && <Feature image={parking} alt={'Парковка'} featureName={'Парковка'}/>}
            {isLiveMusic && <Feature image={livemusic} alt={'Жива музика'} featureName={'Жива музика'}/>}
            {is24hrs && <Feature image={hours24_7} alt={'24/7'} featureName={'24/7'}/>}
        </CardFooter>
    </CardRoot>)
}

export default FoodAndDrinkCard