import { Card, CardContent, CardHeader, CardTitle } from "@heroui/react";
import {IPiyachokList} from "@/src/interfaces/piyachok/IPiyachokList";
import {FC} from "react";
import {utilsService} from "@/src/services/utils.service";
import Image from "next/image";
import noImage from "@/src/public/no-image-icon.jpg";
import Link from "next/link";

type PropsType = {
    piyachok: IPiyachokList
}

const PiyachokCard: FC<PropsType> = ({piyachok}) => {
    const {id, meetDate, meetTime, purpose, foodAndDrink: {name, mainImage}} = piyachok
    const meetDateLocalDateString = utilsService.getLocalDate(meetDate)
    const formattedTime = meetTime.substring(0, meetTime.length - 3)
    return (
        <Link href={'/piyachok/' + id} className="flex flex-col h-full">
           <Card className="h-[51vh]">
                {mainImage ? <Image src={utilsService.buildStorageURL(mainImage)} alt={'Фото закладу'} width={300} height={150} className="w-auto h-[25vh] rounded-sm" priority={true}/> : <Image src={noImage} alt={'Зображення відсутнє'} width={200} height={20} priority={true} className="w-full h-auto rounded-sm border-black border-solid border-2"/>}
                <CardHeader className="flex flex-row items-center justify-between mt-1">
                    <CardTitle className="font-bold">
                        {name}
                    </CardTitle>
                </CardHeader>
                <p>📅 {meetDateLocalDateString}, {formattedTime}</p>
                <CardContent className="line-clamp-3 text-sm">
                    {purpose}
                </CardContent>
            </Card>
        </Link>
    )
}

export default PiyachokCard