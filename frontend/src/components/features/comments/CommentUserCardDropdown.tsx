'use client'
import {commentsService} from "@/src/services/comments.service";
import {Button, Dropdown} from "@heroui/react";
import {EllipsisVertical, House, TrashBin} from "@gravity-ui/icons";
import { FC, useState } from "react";
import Link from "next/link";
import {updateTagAction} from "@/src/actions/server.actions";
import {FoodAndDrinkStatusEnum} from "@/src/enums/food-and-drink/food-and-drink-status.enum";
import DeleteModalWindow from "@/src/components/shared/components/delete-modal-window/DeleteModalWindow";

type PropsType = {
    commentId: string,
    foodAndDrinkId: string,
    status: FoodAndDrinkStatusEnum,
    text: string
}

const CommentUserCardDropdown: FC<PropsType> = ({commentId, foodAndDrinkId, status, text}) => {
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
                    {status === FoodAndDrinkStatusEnum.ACTIVE && <Dropdown.Menu>
                        <Dropdown.Item>
                            <Link href={`/food-and-drink/${foodAndDrinkId}`} className="flex gap-3 items-center">
                                <House/> Подивитись заклад
                            </Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>}
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setIsOpenDeleteModal(true)} className="text-red-600"><TrashBin/> Видалити</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
            <DeleteModalWindow handleDelete={handleDelete} resourceDescription={`коментар "${text}"`} isButton={false} isOpen={isOpenDeleteModal} setIsOpen={setIsOpenDeleteModal}/>
        </div>
    )
}

export default CommentUserCardDropdown