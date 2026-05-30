import {IFoodAndDrinkOneFromList} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOneFromList";
import Image, {StaticImageData} from "next/image";
import noImage from "@/src/public/no-image-icon.jpg"
import wifi from "@/src/public/wifi-signalpng.png"
import livemusic from "@/src/public/live-music.png"
import parking from "@/src/public/parking.png"
import hours24_7 from "@/src/public/24_7.png"
import Feature from "@/src/components/features/food-and-drink/feature/Feature";
import {utils} from "@/src/utils/utils";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@heroui/react";
import {FoodAndDrinkFeaturesEnum} from "@/src/enums/food-and-drink/food-and-drink-features.enum";
import Link from "next/link";
import {UrlObject} from "node:url";
import Decision from "@/src/components/ui/decision/Decision";

const icons: Record<FoodAndDrinkFeaturesEnum, StaticImageData> = {
    [FoodAndDrinkFeaturesEnum.WI_FI]: wifi,
    [FoodAndDrinkFeaturesEnum.LIVE_MUSIC]: livemusic,
    [FoodAndDrinkFeaturesEnum.PARKING]: parking,
    [FoodAndDrinkFeaturesEnum.IS_24_HOURS]: hours24_7,
}

type PropsType = {
    foodAndDrinkOneFromList: IFoodAndDrinkOneFromList
    id: string
    href: string | UrlObject
    isPrivate?: boolean
}

export const FoodAndDrinkCard = ({foodAndDrinkOneFromList, id, href, isPrivate = false}: PropsType) => {
    const {name, type, location: {street}, city, features, mainImage, distance} = foodAndDrinkOneFromList
    return (<Card className="w-[300px] text-[14px]">
        <Link href={href + '/' + id} className="flex flex-col gap-2">
            {mainImage ? <Image src={utils.buildStorageURL(mainImage)} alt={'Фото закладу'} width={300} height={50} className="w-full h-auto rounded-sm" priority={true}/> : <Image src={noImage} alt={'Зображення відсутнє'} width={200} height={20} priority={true} className="w-full h-auto rounded-sm border-black border-solid border-2"/>}
            <CardHeader>
                <CardTitle className="font-bold">
                    {name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>{utils.capitalizeFirstLetter(type)}</p>
                <p>{street}, {city}{distance ? `, ${distance}` : ''}</p>
            </CardContent>
            <CardFooter className="gap-3 text-[12px]">
                {features.map((feature) => <Feature key={feature} image={icons[feature as FoodAndDrinkFeaturesEnum]} alt={feature} featureName={feature}/>)}
            </CardFooter>
        </Link>
        {isPrivate && <Decision id={id}/>}
    </Card>)
}

export default FoodAndDrinkCard