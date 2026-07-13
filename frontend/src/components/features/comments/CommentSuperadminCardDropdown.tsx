'use client'
import {commentsService} from "@/src/services/comments.service";
import { Button, Dropdown } from "@heroui/react";
import { EllipsisVertical, House, Person, TrashBin } from "@gravity-ui/icons";
import {FC} from "react";
import Link from "next/link";
import {updateTagAction} from "@/src/actions/server.actions";

type PropsType = {
    commentId: string,
    foodAndDrinkId: string,
    userId: string
}

const CommentSuperadminCardDropdown: FC<PropsType> = ({commentId, foodAndDrinkId, userId}) => {
    const handleDelete = async () => {
        const {success} = await commentsService.delete(commentId);
        if(success){
            await updateTagAction('my-comments')
            await updateTagAction(`food-and-drink-comments-${foodAndDrinkId}`)
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
                    <Dropdown.Item>
                        <Link href={`/food-and-drink/${foodAndDrinkId}`} className="flex gap-3">
                            <House/> Подивитись заклад
                        </Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <Link href={`/food-and-drink/${userId}`} className="flex gap-3">
                            <Person/> Подивитись користувача
                        </Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleDelete} className="text-red-600"><TrashBin/> Видалити</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    )
}

export default CommentSuperadminCardDropdown