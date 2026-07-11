import {Heading} from "@heroui/react";
import CommentForm from "@/src/components/features/comments/CommentForm";
import {FC} from "react";
import AvatarCustom from "@/src/components/shared/ui/AvatarCustom";
import UserAvatar from "@/src/public/default_user_avatar.png";
import FoodAndDrinkCommentsList from "@/src/components/features/comments/FoodAndDrinkCommentsList";
import {IUser} from "@/src/interfaces/users/IUser";

type PropsType = {
    photo: string | null,
    isLogged: boolean,
    foodAndDrinkId: string,
    user: IUser | null,
    isOwner: boolean | null
}

const FoodAndDrinkCommentsBlock: FC<PropsType> = ({photo, isLogged, foodAndDrinkId, user, isOwner}) => {
    return (
        <section className="flex flex-col gap-3 mt-3">
            <Heading level={3}>Коментарі</Heading>
            <div className="flex gap-3 w-full items-center">
                <AvatarCustom photo={photo} defaultPhoto={UserAvatar.src} width={50} height={50}/>
                <CommentForm isLogged={isLogged} foodAndDrinkId={foodAndDrinkId}/>
            </div>
            <FoodAndDrinkCommentsList foodAndDrinkId={foodAndDrinkId} user={user} isOwner={isOwner}/>
        </section>
    )
}

export default FoodAndDrinkCommentsBlock