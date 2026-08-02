'use client'
import {commentsService} from "@/src/services/comments.service";
import { Button, Dropdown } from "@heroui/react";
import { EllipsisVertical, House, Person, TrashBin } from "@gravity-ui/icons";
import {FC, useState} from "react";
import Link from "next/link";
import {updateTagAction} from "@/src/actions/server.actions";
import DeleteModalWindow from "@/src/components/shared/components/delete-modal-window/DeleteModalWindow";

type PropsType = {
    commentId: string,
    foodAndDrinkId: string,
    userId: string,
    text: string
}

const CommentSuperadminCardDropdown: FC<PropsType> = ({commentId, foodAndDrinkId, userId, text}) => {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
    const handleDelete = async () => {
        const {success} = await commentsService.delete(commentId);
        if(success){
            await updateTagAction('my-comments')
            await updateTagAction(`food-and-drink-comments-${foodAndDrinkId}`)
            await updateTagAction('all-comments')
        }
    }
    return (
        <div>
            <Dropdown>
                <Button isIconOnly aria-label="Menu" variant="secondary">
                    <EllipsisVertical className="outline-none" />
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Link href={`/account/superadmin/food-and-drinks/${foodAndDrinkId}`} className="flex gap-3">
                                <House/> Подивитись заклад
                            </Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Link href={`/account/superadmin/users/${userId}`} className="flex gap-3">
                                <Person/> Подивитись користувача
                            </Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setIsOpenDeleteModal(true)} className="text-red-600"><TrashBin/> Видалити</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
        <DeleteModalWindow handleDelete={handleDelete} resourceDescription={`коментар "${text}"`} isButton={false} isOpen={isOpenDeleteModal} setIsOpen={setIsOpenDeleteModal}/>
        </div>
)
}

export default CommentSuperadminCardDropdown