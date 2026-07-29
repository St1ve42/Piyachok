'use client'
import {ICommentWithUser} from "@/src/interfaces/comments/ICommentWithUser";
import {FC, useState} from "react";
import { Button, Card, Form, Input, toast } from "@heroui/react";
import AvatarCustom from "@/src/components/shared/ui/AvatarCustom";
import UserAvatar from "@/src/public/default_user_avatar.png";
import FoodAndDrinkCommentCardDropdown from "@/src/components/features/comments/FoodAndDrinkCommentCardDropdown";
import {IUser} from "@/src/interfaces/users/IUser";
import {GlobalUserRoleEnum} from "@/src/enums/user/global.user.role.enum";
import {useForm} from "react-hook-form";
import {IUserCommentInput} from "@/src/interfaces/comments/IUserCommentInput";
import {commentsService} from "@/src/services/comments.service";
import {updateTagAction} from "@/src/actions/server.actions";
import {useQueryClient} from "@tanstack/react-query";

type PropsType = {
    comment: ICommentWithUser,
    user: IUser | null,
    isOwner: boolean | null,
    foodAndDrinkId: string,
    ref?: (node?: (Element | null)) => void
}

const CommentCard: FC<PropsType> = ({comment, user, isOwner, foodAndDrinkId, ref}) => {
    const [isEdited, setIsEdited] = useState(false)
    const queryClient = useQueryClient()
    const {register, handleSubmit} = useForm<IUserCommentInput>({mode: 'all'})
    const {user: {name, surname, photo, id: creatorId}, text, createdAt, id} = comment
    const handleSaveComment = async (formData: IUserCommentInput): Promise<void> => {
        const commentUpdateResponse = await commentsService.update(id, formData)
        if(!commentUpdateResponse.success){
            toast.danger(commentUpdateResponse.data.message)
            return
        }
        await queryClient.invalidateQueries({queryKey: ['food-and-drink-comments', foodAndDrinkId]})
        await updateTagAction('my-comments')
        await updateTagAction('all-comments')
        setIsEdited(false)
    }
    const localCreatedAt = new Date(createdAt).toLocaleDateString('uk-UA')
    return (
        <Card ref={ref} className="flex-row justify-between">
            <div className="flex gap-3 w-full">
                <AvatarCustom photo={photo} defaultPhoto={UserAvatar.src} width={50} height={50}/>
                <div className="w-full flex flex-col">
                    <Card.Title className="flex gap-2 items-center">
                        <span>{name} {surname}</span>
                        <span className="text-[#606060] text-[13px]">{localCreatedAt}</span>
                    </Card.Title>
                    {isEdited ?
                        <Form onSubmit={handleSubmit(handleSaveComment)} className="flex flex-col gap-2">
                            <Input type='text' defaultValue={text} {...register('text')} className="w-full"/>
                            <div className="flex gap-2">
                                <Button onClick={() => setIsEdited(false)}>Скасувати</Button>
                                <Button type={'submit'}>Зберегти</Button>
                            </div>
                    </Form>: <Card.Content>{text}</Card.Content>}

                </div>
            </div>
            {user && (user.role === GlobalUserRoleEnum.SUPERADMIN || user.id === creatorId || isOwner) && <FoodAndDrinkCommentCardDropdown commentId={id} foodAndDrinkId={foodAndDrinkId} setIsEdited={setIsEdited}/>}
        </Card>
    )
}

export default CommentCard