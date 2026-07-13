'use client'
import {Button, Dropdown} from "@heroui/react";
import { EllipsisVertical, TrashBin } from "@gravity-ui/icons";
import {commentsService} from "@/src/services/comments.service";
import {FC} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {updateTagAction} from "@/src/actions/server.actions";

type PropsType = {
    commentId: string,
    foodAndDrinkId: string
}

const FoodAndDrinkCommentCardDropdown: FC<PropsType> = ({commentId, foodAndDrinkId}) => {
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
                    <Dropdown.Item onClick={handleDelete}><TrashBin/> Видалити</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    )
}

export default FoodAndDrinkCommentCardDropdown