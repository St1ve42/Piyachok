import {FC} from "react";
import {Heading} from "@heroui/react";
import Image from "next/image";
import {utilsService} from "@/src/services/utils.service";
import NoImage from "@/src/public/no-image-icon.jpg";
import {IGeneralNewsById} from "@/src/interfaces/news/IGeneralNewsById";
import {NewsCategoryTranslation} from "@/src/constants/news-category.translation";
import Link from "next/link";

type PropsType = {
    news: IGeneralNewsById
}

const NewsDetailsView: FC<PropsType> = async ({news}) => {
    const { title, photo, category, text, createdAt, foodAndDrink: {id, name} } = news;
    const createdAtLocalDateString = utilsService.getLocalDate(createdAt)
    const createdAtLocalTimeString = utilsService.getLocalTime(createdAt)
    return (
        <section className="w-full flex justify-center">
            <div className="w-[650px] flex flex-col justify-center gap-3 mb-2">
                <Heading level={5}>{NewsCategoryTranslation[category]}</Heading>
                <Heading level={5}>{title}</Heading>
                <div className="flex gap-1 items-center">📅 <span>{createdAtLocalDateString}, {createdAtLocalTimeString}</span></div>
                <div className="relative h-[280px]">
                    <Image src={photo ? utilsService.buildStorageURL(photo) : NoImage} fill={true} alt={photo ?? 'Відсутнє зображення'}/>
                </div>
                <p className="text-sm md:text-base leading-relaxed tracking-normal font-normal max-w-3xl whitespace-pre-line break-words">
                    {text}
                </p>                <p className="flex gap-1">
                    <span className="font-bold">Заклад:</span>
                    <Link href={`/food-and-drink/${id}`} className="text-blue-600">{name}</Link>
                </p>
            </div>
        </section>
    )
}

export default NewsDetailsView