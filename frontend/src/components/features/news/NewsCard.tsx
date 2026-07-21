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
            <Card className="text-sm h-[45vh] relative">
                <div className="relative h-[22vh]">
                    <Image src={photo ? utilsService.buildStorageURL(photo) : NoImage} fill={true} alt={photo ?? 'Відсутнє зображення'}/>
                </div>
                <div className="flex flex-col gap-2">
                    <p>📅 {createdAtLocalDateString}, {createdAtLocalTimeString}</p>
                    <Card.Title className="w-full text-[14px] font-bold">
                        {title}
                    </Card.Title>
                </div>
                <Card.Footer className="justify-between">
                    <span><span className="font-bold">Заклад:</span> {name}</span>
                    {isPromoted && <Chip variant={'primary'} color={'accent'} className="absolute top-3 right-3">Топ</Chip>}
                </Card.Footer>
            </Card>
        </Link>
    )
}

export default NewsCard