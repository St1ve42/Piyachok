import {IFoodAndDrinkOneFromList} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOneFromList";
import Image from "next/image";
import noImage from "@/src/public/no-image-icon.jpg"
import {Card, CardContent, CardHeader, CardTitle, Chip} from "@heroui/react";
import Link from "next/link";
import {UrlObject} from "node:url";
import Decision from "@/src/components/features/food-and-drink/decision/Decision";
import { utilsService } from "@/src/services/utils.service";
import ReadOnlyStarRating from "@/src/components/shared/ui/ReadOnlyStarRating";
import Favourite from "@/src/components/features/food-and-drink/Favourite";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import FoodAndDrinksByCategoryDropdown from "@/src/components/features/food-and-drink/FoodAndDrinksByCategoryDropdown";
import {Pencil} from "@gravity-ui/icons";

type PropsType = {
    foodAndDrinkOneFromList: IFoodAndDrinkOneFromList & {isCustomRating?: boolean}
    id: string
    href: string | UrlObject
    mode?: 'default' | 'moderate' | 'favourite' | 'top' | 'superadmin-top' | 'all',
    categoryId?: string
}

export const FoodAndDrinkCard = async ({foodAndDrinkOneFromList, id, href, mode = 'default', categoryId}: PropsType) => {
    const {name, type, location: {street}, city, mainImage, distance, rating, averageReceipt, topCategories} = foodAndDrinkOneFromList
    const response = await foodAndDrinkService.findTypes()
    return (<Card className="text-[14px] relative">
        <Link href={href + '/' + id} className="flex flex-col h-full">
            {mainImage ? <Image src={utilsService.buildStorageURL(mainImage)} alt={'Фото закладу'} width={300} height={150} className="w-auto h-[25vh] rounded-sm" priority={true}/> : <Image src={noImage} alt={'Зображення відсутнє'} width={200} height={20} priority={true} className="w-full h-auto rounded-sm border-black border-solid border-2"/>}
            <CardHeader className="flex flex-row items-center justify-between mt-1">
                <CardTitle className="font-bold">
                    {name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>{response.success && <span>{utilsService.capitalizeFirstLetter(response.data[type])}</span>}</p>
                <p>{street}, {city}{distance ? `, ${distance}` : ''}</p>
                <div className="flex justify-between">
                    <p className="flex gap-1 items-center">{rating ?? 0} <ReadOnlyStarRating initialValue={rating ?? 0}/> {mode === 'all' && 'isCustomRating' in foodAndDrinkOneFromList && (foodAndDrinkOneFromList.isCustomRating ? <Pencil/> : '')}</p>
                    <p>{averageReceipt} грн / чек</p>
                </div>
                {mode === 'top' && (topCategories ? <div className="flex gap-1 flex-wrap items-center">🏆 Найкращі для: {topCategories.map(topCategory => <Chip key={topCategory}>{topCategory}</Chip>)}</div> : <div>🏆 Найкращі для: <Chip>Інформація відсутня</Chip></div>)}
            </CardContent>
        </Link>
        {mode === 'favourite' && <div className="self-end cursor-pointer"><Favourite foodAndDrinkId={id} isFavourite={true}/></div>}
        {mode === 'moderate' && <Decision id={id}/>}
        {mode === 'superadmin-top' && categoryId && <div className="absolute top-2 right-2"><FoodAndDrinksByCategoryDropdown categoryId={categoryId} foodAndDrinkId={id}/></div>}
    </Card>)
}

export default FoodAndDrinkCard