'use client'
import {Button, Dropdown} from "@heroui/react";
import {EllipsisVertical, TrashBin} from "@gravity-ui/icons";
import { FC, useState } from "react";
import {newsService} from "@/src/services/news.service";
import {updateTagAction} from "@/src/actions/server.actions";
import DeleteModalWindow from "@/src/components/shared/components/delete-modal-window/DeleteModalWindow";

type PropsType = {
    newsId: string,
    foodAndDrinkId: string,
    title: string
}

const NewsFoodAndDrinkDropdown: FC<PropsType> = ({newsId, foodAndDrinkId, title}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const handleDelete = async () => {
        await newsService.delete(newsId);
        await updateTagAction(`food-and-drink-news-${foodAndDrinkId}`)
    }
    const deleteMessage = `новину "${title}"`
    return (
        <div>
            <Dropdown>
                <Button isIconOnly aria-label="Menu" variant="secondary">
                    <EllipsisVertical className="outline-none" />
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setIsOpen(true)} className="text-red-600"><TrashBin/> Видалити</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
            <DeleteModalWindow handleDelete={handleDelete} isButton={false} isOpen={isOpen} setIsOpen={setIsOpen} resourceDescription={deleteMessage}/>
        </div>
    )
}

export default NewsFoodAndDrinkDropdown