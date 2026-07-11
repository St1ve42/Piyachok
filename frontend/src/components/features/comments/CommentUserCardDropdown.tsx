'use client'
import {commentsService} from "@/src/services/comments.service";
import { Button, Dropdown } from "@heroui/react";
import { EllipsisVertical, Eye, TrashBin } from "@gravity-ui/icons";
import {FC} from "react";
import Link from "next/link";
import {updateTagAction} from "@/src/actions/server.actions";

type PropsType = {
    commentId: string,
    foodAndDrinkId: string
}

const CommentUserCardDropdown: FC<PropsType> = ({commentId, foodAndDrinkId}) => {
    const handleDelete = async () => {
        const {success} = await commentsService.delete(commentId);
        if(success){
            await updateTagAction('my-comments')
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
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <Link href={`/food-and-drink/${foodAndDrinkId}`} className="flex gap-3">
                            <Eye/> Подивитись
                        </Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    )
}

export default CommentUserCardDropdown