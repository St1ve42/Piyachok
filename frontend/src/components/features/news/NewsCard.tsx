import {IGeneralNews} from "@/src/interfaces/news/IGeneralNews";
import {FC} from "react";
import { Card, Chip } from "@heroui/react";
import NoImage from "@/src/public/no-image-icon.jpg"
import Image from "next/image";
import {utilsService} from "@/src/services/utils.service";
import Link from "next/link";

type PropsType = {
    news: IGeneralNews
}

const NewsCard: FC<PropsType> = ({news}) => {
    const {id, title, photo, isPromoted, createdAt, foodAndDrink: {name}} = news
    const createdAtLocalDateString = utilsService.getLocalDate(createdAt)
    const createdAtLocalTimeString = utilsService.getLocalTime(createdAt)
    return (
        <Link href={`/news/${id}`}>
            <Card className="text-sm h-[345px] relative">
                <div className="relative h-[150px] shrink-0">
                    <Image src={photo ? utilsService.buildStorageURL(photo) : NoImage} fill={true} alt={photo ?? 'Відсутнє зображення'}/>
                </div>
                <p>📅 {createdAtLocalDateString}, {createdAtLocalTimeString}</p>
                <div className="flex flex-col gap-2 justify-between">
                    <Card.Title className="w-full text-[14px] line-clamp-3">
                        {title}
                    </Card.Title>
                    <Card.Footer className="justify-between line-clamp-2">
                        <span>Заклад: <span className="font-bold">{name}</span></span>
                        {isPromoted && <Chip variant={'primary'} color={'accent'} className="absolute top-3 right-3">Топ</Chip>}
                    </Card.Footer>
                </div>
            </Card>
        </Link>
    )
}

export default NewsCard