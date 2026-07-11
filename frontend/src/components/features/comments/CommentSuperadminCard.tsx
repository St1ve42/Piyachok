import {ICommentWithUserAndFoodAndDrink} from "@/src/interfaces/comments/ICommentWithUserAndFoodAndDrink";
import {FC} from "react";
import {Card} from "@heroui/react";
import CommentUserCardDropdown from "@/src/components/features/comments/CommentUserCardDropdown";
import AvatarCustom from "@/src/components/shared/ui/AvatarCustom";
import UserAvatar from "@/src/public/default_user_avatar.png";

type PropsType = {
    comment: ICommentWithUserAndFoodAndDrink
}

const CommentSuperadminCard: FC<PropsType> = ({comment}) => {
    const {foodAndDrink: {id: foodAndDrinkId, name: foodAndDrinkName}, user: {surname, name: userName, photo}, createdAt, text, id} = comment
    const localCreatedAt = new Date(createdAt).toLocaleDateString('uk-UA')
    return (
        <Card className="flex-row justify-between">
            <div className="flex flex-col gap-3">
                <Card.Title className="flex gap-2">
                    <span>{foodAndDrinkName}</span>
                </Card.Title>
                <div className="flex gap-3">
                    <AvatarCustom photo={photo} defaultPhoto={UserAvatar.src} width={50} height={50}/>
                    <div>
                        <div className="flex gap-2">
                            <span>{userName} {surname}</span>
                            <span className="text-[#606060] text-[13px]">{localCreatedAt}</span>
                        </div>
                        <Card.Content>{text}</Card.Content>
                    </div>
                </div>
            </div>
            <CommentUserCardDropdown commentId={id} foodAndDrinkId={foodAndDrinkId}/>
        </Card>
    )
}

export default CommentSuperadminCard