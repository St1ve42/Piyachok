import {ICommentWithUser} from "@/src/interfaces/comments/ICommentWithUser";
import {FC} from "react";
import {Card} from "@heroui/react";
import AvatarCustom from "@/src/components/shared/ui/AvatarCustom";
import UserAvatar from "@/src/public/default_user_avatar.png";
import FoodAndDrinkCommentCardDropdown from "@/src/components/features/comments/FoodAndDrinkCommentCardDropdown";
import {IUser} from "@/src/interfaces/users/IUser";
import {GlobalUserRoleEnum} from "@/src/enums/user/global.user.role.enum";

type PropsType = {
    comment: ICommentWithUser,
    user: IUser | null,
    isOwner: boolean | null,
    foodAndDrinkId: string
}

const CommentCard: FC<PropsType> = ({comment, user, isOwner, foodAndDrinkId}) => {
    const {user: {name, surname, photo, id: creatorId}, text, createdAt, id} = comment
    const localCreatedAt = new Date(createdAt).toLocaleDateString('uk-UA')
    return (
        <Card className="flex-row justify-between">
            <div className="flex gap-3">
                <AvatarCustom photo={photo} defaultPhoto={UserAvatar.src} width={50} height={50}/>
                <div>
                    <Card.Title className="flex gap-2">
                        <span>{name} {surname}</span>
                        <span className="text-[#606060] text-[13px]">{localCreatedAt}</span>
                    </Card.Title>
                    <Card.Content>{text}</Card.Content>
                </div>
            </div>
            {user && (user.role === GlobalUserRoleEnum.SUPERADMIN || user.id === creatorId || isOwner) && <FoodAndDrinkCommentCardDropdown commentId={id} foodAndDrinkId={foodAndDrinkId}/>}
        </Card>
    )
}

export default CommentCard