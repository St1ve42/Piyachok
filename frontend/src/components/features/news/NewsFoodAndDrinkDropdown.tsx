import {Button, Dropdown} from "@heroui/react";
import {EllipsisVertical, TrashBin} from "@gravity-ui/icons";
import {FC} from "react";
import {newsService} from "@/src/services/news.service";

type PropsType = {
    newsId: string
}

const NewsFoodAndDrinkDropdown: FC<PropsType> = ({newsId}) => {
    const handleDelete = async () => {
        await newsService.delete(newsId);
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