import {IFoodAndDrinkOneFromList} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOneFromList";
import Image, {StaticImageData} from "next/image";
import noImage from "@/src/public/no-image-icon.jpg"
import wifi from "@/src/public/wifi-signalpng.png"
import livemusic from "@/src/public/live-music.png"
import parking from "@/src/public/parking.png"
import hours24_7 from "@/src/public/24_7.png"
import Feature from "@/src/components/shared/food-and-drink/feature/Feature";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@heroui/react";
import {FoodAndDrinkFeaturesEnum} from "@/src/enums/food-and-drink/food-and-drink-features.enum";
import Link from "next/link";
import {UrlObject} from "node:url";
import Decision from "@/src/components/features/superadmin/food-and-drink/moderate/decision/Decision";
import { utils } from "@/src/services/utils.service";
import TemporaryFavourite from "@/src/components/features/account/favourites/components/TemporaryFavourite";

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
    mode: 'default' | 'moderate' | 'favourite'
}

export const FoodAndDrinkCard = ({foodAndDrinkOneFromList, id, href, mode}: PropsType) => {
    const {name, type, location: {street}, city, features, mainImage, distance} = foodAndDrinkOneFromList
    return (<Card className="text-[14px]">
        <Link href={href + '/' + id} className="flex flex-col gap-2 h-full">
            {mainImage ? <Image src={utils.buildStorageURL(mainImage)} alt={'Фото закладу'} width={300} height={150} className="w-auto h-[25vh] rounded-sm" priority={true}/> : <Image src={noImage} alt={'Зображення відсутнє'} width={200} height={20} priority={true} className="w-full h-auto rounded-sm border-black border-solid border-2"/>}
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-bold">
                    {name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>{utils.capitalizeFirstLetter(type)}</p>
                <p>{street}, {city}{distance ? `, ${distance}` : ''}</p>
            </CardContent>
            {features && <CardFooter className="gap-3 text-[12px]">
                {features.map((feature) => <Feature key={feature} image={icons[feature as FoodAndDrinkFeaturesEnum]} alt={feature} featureName={feature}/>)}
            </CardFooter>}
        </Link>
        {mode === 'favourite' && <TemporaryFavourite foodAndDrinkId={id}/>}
        {mode === 'moderate' && <Decision id={id}/>}
    </Card>)
}

export default FoodAndDrinkCard