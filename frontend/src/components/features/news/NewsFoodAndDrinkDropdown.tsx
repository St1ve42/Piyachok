import {Button, Dropdown} from "@heroui/react";
import {EllipsisVertical, TrashBin} from "@gravity-ui/icons";
import {FC} from "react";
import {newsService} from "@/src/services/news.service";
import {updateTagAction} from "@/src/actions/server.actions";

type PropsType = {
    newsId: string,
    foodAndDrinkId: string
}

const NewsFoodAndDrinkDropdown: FC<PropsType> = ({newsId, foodAndDrinkId}) => {
    const handleDelete = async () => {
        await newsService.delete(newsId);
        await updateTagAction(`food-and-drink-news-${foodAndDrinkId}`)
    }
    return (
        <Dropdown>
            <Button isIconOnly aria-label="Menu" variant="secondary">
                <EllipsisVertical className="outline-none" />
            </Button>
            <Dropdown.Popover>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleDelete} className="text-red-600"><TrashBin/> Видалити</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    )
}

export default NewsFoodAndDrinkDropdown