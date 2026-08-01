'use client'
import {Button, Dropdown} from "@heroui/react";
import { EllipsisVertical, Pencil, TrashBin } from "@gravity-ui/icons";
import { commentsService } from "@/src/services/comments.service";
import { Dispatch, FC, SetStateAction, useState } from "react";
import {useQueryClient} from "@tanstack/react-query";
import {updateTagAction} from "@/src/actions/server.actions";
import DeleteModalWindow from "@/src/components/shared/components/delete-modal-window/DeleteModalWindow";
import {GlobalUserRoleEnum} from "@/src/enums/user/global.user.role.enum";
import {IUser} from "@/src/interfaces/users/IUser";
import {IUserShortInfo} from "@/src/interfaces/users/IUserShortInfo";

type PropsType = {
    commentId: string,
    foodAndDrinkId: string,
    setIsEdited: Dispatch<SetStateAction<boolean>>,
    user?: IUser,
    isOwner: boolean | null,
    creator: IUserShortInfo
}

const FoodAndDrinkCommentCardDropdown: FC<PropsType> = ({commentId, foodAndDrinkId, setIsEdited, user, isOwner, creator}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const queryClient = useQueryClient();
    const handleDelete = async () => {
        const {success} = await commentsService.delete(commentId);
        if(success){
            await queryClient.invalidateQueries({queryKey: ['food-and-drink-comments', foodAndDrinkId]})
            await updateTagAction('my-comments')
            await updateTagAction('all-comments')
        }
    }
    const {name, surname} = creator
    const deleteMessage = (user?.role === GlobalUserRoleEnum.SUPERADMIN || isOwner) ? `коментар користувача ${name} ${surname}` : `свій коментар`
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
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setIsEdited(true)}><Pencil/> Редагувати</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
            <DeleteModalWindow handleDelete={handleDelete} isButton={false} isOpen={isOpen} setIsOpen={setIsOpen} resourceDescription={deleteMessage}/>
        </div>
    )
}

export default FoodAndDrinkCommentCardDropdown