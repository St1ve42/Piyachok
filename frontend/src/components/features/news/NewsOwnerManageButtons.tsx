'use client'
import { Button, toast} from "@heroui/react";
import { Pencil, TrashBin } from "@gravity-ui/icons";
import {FC} from "react";
import {newsService} from "@/src/services/news.service";
import { redirect, useRouter } from "next/navigation";
import {updateTagAction} from "@/src/actions/server.actions";

type PropsType = {
    newsId: string,
    foodAndDrinkId: string
}

const NewsOwnerManageButtons: FC<PropsType> = ({newsId, foodAndDrinkId}) => {
    const router = useRouter()
    const handleDelete = async () => {
        const response = await newsService.delete(newsId)
        if(response.success){
            toast.success('Новину успішно видалено!')
            await updateTagAction('public-news')
            await updateTagAction(`detail-news-${newsId}`)
            await updateTagAction(`food-and-drink-news-${foodAndDrinkId}`)
            redirect(`/account/news`)
        }
    }
    return (
        <div className="flex items-center gap-4">
            <Button className="self-end" onPress={() => router.push(`/account/news/${newsId}/update`)}><Pencil/>Редагувати</Button>
            <Button variant="danger" onPress={handleDelete}><TrashBin/>Видалити</Button>
        </div>
    )
}

export default NewsOwnerManageButtons