'use client'
import {Button, Dropdown} from "@heroui/react";
import { EllipsisVertical, Pencil, TrashBin } from "@gravity-ui/icons";
import { commentsService } from "@/src/services/comments.service";
import { Dispatch, FC, SetStateAction } from "react";
import {useQueryClient} from "@tanstack/react-query";
import {updateTagAction} from "@/src/actions/server.actions";

type PropsType = {
    commentId: string,
    foodAndDrinkId: string,
    setIsEdited: Dispatch<SetStateAction<boolean>>
}

const FoodAndDrinkCommentCardDropdown: FC<PropsType> = ({commentId, foodAndDrinkId, setIsEdited}) => {
    const queryClient = useQueryClient();
    const handleDelete = async () => {
        const {success} = await commentsService.delete(commentId);
        if(success){
            await queryClient.invalidateQueries({queryKey: ['food-and-drink-comments', foodAndDrinkId]})
            await updateTagAction('my-comments')
            await updateTagAction('all-comments')
        }
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
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setIsEdited(true)}><Pencil/> Редагувати</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    )
}

export default FoodAndDrinkCommentCardDropdown