import {FC} from "react";
import { Card } from "@heroui/react";
import NoImage from "@/src/public/no-image-icon.jpg"
import Image from "next/image";
import {utilsService} from "@/src/services/utils.service";
import Link from "next/link";
import {NewsCategoryTranslation} from "@/src/constants/news-category.translation";
import {INews} from "@/src/interfaces/news/INews";
import {newsIcons} from "@/src/constants/news-icons";
import NewsFoodAndDrinkDropdown from "@/src/components/features/news/NewsFoodAndDrinkDropdown";

type PropsType = {
    news: INews,
    href?: string,
    hasRightToManageNews?: boolean,
    mode?: 'default',
    foodAndDrinkId?: string,
    foodAndDrinkName?: string
}

const FoodAndDrinkNewsCard: FC<PropsType> = ({news, href = `news`, hasRightToManageNews = false, mode, foodAndDrinkId, foodAndDrinkName}) => {
    const {id, title, createdAt, photo, category} = news
    const createdAtLocalDateString = utilsService.getLocalDate(createdAt)
    const createdAtLocalTimeString = utilsService.getLocalTime(createdAt)
    return (
        <Link href={`/${href}/${id}`} className="w-full">
            <Card className="text-sm h-[350px] relative">
                <div className="relative h-[150px]">
                    <Image src={photo ? utilsService.buildStorageURL(photo) : NoImage} fill={true} alt={photo ?? 'Відсутнє зображення'}/>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center">
                        {newsIcons[category]}
                        <span>{NewsCategoryTranslation[category]}</span>
                    </div>
                    <div className="flex gap-1 items-center">📅 <span>{createdAtLocalDateString}, {createdAtLocalTimeString}</span></div>
                    <Card.Title className="w-full text-[14px] font-bold">
                        {title}
                    </Card.Title>
                </div>
                {mode === 'default' && hasRightToManageNews && foodAndDrinkId && foodAndDrinkName && <div className="absolute top-3 right-3"><NewsFoodAndDrinkDropdown newsId={id} foodAndDrinkId={foodAndDrinkId} foodAndDrinkName={foodAndDrinkName} title={title}/></div>}
            </Card>
        </Link>
    )
}

export default FoodAndDrinkNewsCard