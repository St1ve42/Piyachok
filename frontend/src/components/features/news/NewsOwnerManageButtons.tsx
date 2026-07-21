'use client'
import Link from "next/link";
import { Button, toast} from "@heroui/react";
import { Pencil, TrashBin } from "@gravity-ui/icons";
import {FC} from "react";
import {newsService} from "@/src/services/news.service";
import {redirect} from "next/navigation";

type PropsType = {
    newsId: string,
}

const NewsOwnerManageButtons: FC<PropsType> = ({newsId}) => {
    const handleDelete = async () => {
        const response = await newsService.delete(newsId)
        if(response.success){
            toast.success('Новину успішно видалено!')
            redirect(`/account/news`)
        }
    }
    return (
        <div className="flex items-center gap-4">
            <Link href={`/account/news/${newsId}/update`}>
                <Button className="self-end"><Pencil/>Редагувати</Button>
            </Link>
            <Button variant="danger" onPress={handleDelete}><TrashBin/>Видалити</Button>
        </div>
    )
}

export default NewsOwnerManageButtons